package services

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"net/mail"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

// AcknowledgeUserEventResponse sends an email with a calendar invite to the user when their response is acknowledged.
func AcknowledgeUserEventResponse(app *pocketbase.PocketBase, eventId, userId, bookingId string) error {
	if eventId == "" || userId == "" || bookingId == "" {
		return errors.New("invalid params: eventId, userId, and bookingId required")
	}

	// Fetch event and expand team relation
	event, err := app.FindRecordById("events", eventId)
	if err != nil {
		return fmt.Errorf("no such event: %w", err)
	}
	if err := app.ExpandRecord(event, []string{"team"}, nil); err != nil {
		return fmt.Errorf("failed to expand team: %w", err)
	}
	team := event.Expand()["team"]
	if team == nil {
		return errors.New("event has no team")
	}

	// Fetch user
	user, err := app.FindRecordById("users", userId)
	if err != nil {
		return fmt.Errorf("no such user: %w", err)
	}

	// Fetch team owner
	ownerId, ok := team.(map[string]interface{})["owner"].(string)
	if !ok || ownerId == "" {
		return errors.New("team has no owner")
	}
	owner, err := app.FindRecordById("users", ownerId)
	if err != nil {
		return fmt.Errorf("no such owner: %w", err)
	}

	// Fetch booking
	booking, err := app.FindRecordById("bookings", bookingId)
	if err != nil {
		return fmt.Errorf("no such booking: %w", err)
	}
	slotsIface := booking.Get("slots")
	slotsArr, ok := slotsIface.([]interface{})
	if !ok || len(slotsArr) == 0 {
		return nil // No slots, nothing to do
	}

	// Fetch slots individually
	slotIds := make([]string, 0, len(slotsArr))
	for _, s := range slotsArr {
		if id, ok := s.(string); ok {
			slotIds = append(slotIds, id)
		}
	}
	if len(slotIds) == 0 {
		return errors.New("no valid slot ids")
	}
	var slots []*core.Record
	for _, slotId := range slotIds {
		slot, err := app.FindRecordById("time_slots", slotId)
		if err != nil {
			continue
		}
		slots = append(slots, slot)
	}
	if len(slots) == 0 {
		return errors.New("no such slots")
	}

	// Collect slot start dates
	var dates []string
	for _, slot := range slots {
		start, _ := slot.Get("starts_at").(string)
		if start != "" {
			dates = append(dates, start)
		}
	}
	if len(dates) == 0 {
		return nil // No valid dates, nothing to do
	}

	userEmail, _ := user.Get("email").(string)
	app.Logger().Info("[AcknowledgeUserEventResponse] send email", "recipient", userEmail)

	// Generate .ics calendar invite
	icsContent, err := eventCalendarInvite(event, user, owner, slots)
	if err != nil {
		return fmt.Errorf("failed to generate calendar invite: %w", err)
	}
	icsFileName := "invite.ics"

	// Prepare email
	meta := map[string]interface{}{
		"appName":       app.Settings().Meta.AppName,
		"appURL":        app.Settings().Meta.AppURL,
		"senderName":    app.Settings().Meta.SenderName,
		"senderAddress": app.Settings().Meta.SenderAddress,
	}
	subject := "Received your booking details for event"
	if title, ok := event.Get("title").(string); ok && title != "" {
		subject = fmt.Sprintf("%s %s", subject, ellipsis(title, 30))
	}

	html, err := template.NewRegistry().LoadFiles(
		"views/emails/layout.html",
		"views/emails/user.response-acknowledged.html",
	).Render(map[string]any{
		"meta":    meta,
		"subject": subject,
		"user":    user.PublicExport(),
		"event":   event.PublicExport(),
	})
	if err != nil {
		return err
	}

	message := &mailer.Message{
		From: mail.Address{
			Address: app.Settings().Meta.SenderAddress,
			Name:    app.Settings().Meta.SenderName,
		},
		To:      []mail.Address{{Address: userEmail}},
		Subject: subject,
		HTML:    html,
		Attachments: map[string]io.Reader{
			icsFileName: bytes.NewReader([]byte(icsContent)),
		},
	}

	return app.NewMailClient().Send(message)
}

func eventCalendarInvite(event, user, owner *core.Record, slots []*core.Record) (string, error) {
	eventFields := event.PublicExport()
	userFields := user.PublicExport()

	title, _ := eventFields["title"].(string)
	userEmail, _ := userFields["email"].(string)

	var events string
	for _, slot := range slots {
		slotFields := slot.PublicExport()
		startStr, _ := slotFields["starts_at"].(string)
		label, _ := slotFields["label"].(string)
		if startStr == "" {
			continue
		}
		startTime, err := time.Parse(time.RFC3339, startStr)
		if err != nil {
			continue
		}
		dateStart := formatDateToCompactISO(startTime)
		dateEnd := formatDateToCompactISO(startTime.Add(4 * time.Hour))
		uid := pseudorandomString(32)
		seq := startTime.Unix()
		events += fmt.Sprintf(`
BEGIN:VEVENT
UID:%s
SEQUENCE:%d
STATUS:CONFIRMED
ATTENDEE;CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=true:mailto:%s
DTSTART:%s
DTEND:%s
SUMMARY:%s (%s)
DESCRIPTION:By using the Spoti.es form, you confirmed your presence to this event.
END:VEVENT
`, uid, seq, userEmail, dateStart, dateEnd, title, label)
	}

	ical := fmt.Sprintf(`BEGIN:VCALENDAR
PRODID:-//Spoti.es//Scheduler//EN
VERSION:2.0
METHOD:PUBLISH%s
END:VCALENDAR`, events)
	return ical, nil
}

// formatDateToCompactISO formats a time.Time to YYYYMMDDTHHMMSSZ (UTC).
func formatDateToCompactISO(t time.Time) string {
	return t.UTC().Format("20060102T150405Z")
}

// pseudorandomString returns a random string of the given length (placeholder).
func pseudorandomString(n int) string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, n)
	for i := range b {
		b[i] = letters[i%len(letters)]
	}
	return string(b)
}
