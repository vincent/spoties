package services

import (
	"errors"
	"fmt"
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

// NotifyEventResponse sends an email to the event owner when a user posts or updates a response.
func NotifyEventResponse(app *pocketbase.PocketBase, eventId, userId string, isUpdating bool) error {
	if eventId == "" || userId == "" {
		return errors.New("invalid params: eventId and userId required")
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

	// Fetch user (responder)
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

	// Set email visibility (if needed, here just a placeholder)
	// owner.Set("emailVisibility", true) // Uncomment if needed

	// Prepare email subject and action
	eventTitle, _ := event.Get("title").(string)
	subject := "New response on event"
	action := "has posted a new response"
	if isUpdating {
		subject = "Updated response on event"
		action = "has updated their response"
	}
	if eventTitle != "" {
		subject = fmt.Sprintf("%s %s", subject, ellipsis(eventTitle, 30))
	}

	// Prepare template data
	meta := map[string]interface{}{
		"appName":       app.Settings().Meta.AppName,
		"appURL":        app.Settings().Meta.AppURL,
		"senderName":    app.Settings().Meta.SenderName,
		"senderAddress": app.Settings().Meta.SenderAddress,
	}

	html, err := template.NewRegistry().LoadFiles(
		"views/emails/layout.html",
		"views/emails/owner.response-changed.html",
	).Render(map[string]any{
		"meta":       meta,
		"subject":    subject,
		"user":       user.PublicExport(),
		"action":     action,
		"isUpdating": isUpdating,
		"owner":      owner.PublicExport(),
		"event":      event.PublicExport(),
	})
	if err != nil {
		return err
	}

	// Prepare and send email
	ownerEmail, _ := owner.Get("email").(string)
	message := &mailer.Message{
		From: mail.Address{
			Address: app.Settings().Meta.SenderAddress,
			Name:    app.Settings().Meta.SenderName,
		},
		To:      []mail.Address{{Address: ownerEmail}},
		Subject: subject,
		HTML:    html,
	}

	app.Logger().Info("[NotifyEventResponse] send email", "recipient", ownerEmail)

	return app.NewMailClient().Send(message)
}

// truncate shortens a string to maxLen runes, adding "..." if truncated.
func ellipsis(s string, maxLen int) string {
	runes := []rune(s)
	if len(runes) <= maxLen {
		return s
	}
	if maxLen < 3 {
		maxLen = 3
	}
	return string(runes[0:maxLen-3]) + "..."
}
