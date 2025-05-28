package services

import (
	"errors"
	"fmt"
	"net/mail"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

// NotifyUserBookingChanged sends an email to the user when their booking on an event is updated.
func NotifyUserBookingChanged(app *pocketbase.PocketBase, eventId, userId string) error {
	if eventId == "" || userId == "" {
		return errors.New("invalid params: eventId and userId required")
	}

	// Fetch event
	event, err := app.FindRecordById("events", eventId)
	if err != nil {
		return fmt.Errorf("no such event: %w", err)
	}

	// Fetch user
	user, err := app.FindRecordById("users", userId)
	if err != nil {
		return fmt.Errorf("no such user: %w", err)
	}

	// Set email visibility (if needed, here just a placeholder)
	// user.Set("emailVisibility", true) // Uncomment if needed

	// Prepare email subject
	eventTitle, _ := event.Get("title").(string)
	subject := "Updated booking on event"
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
		"views/emails/user.booking-changed.html",
	).Render(map[string]any{
		"meta":    meta,
		"subject": subject,
		"user":    user.PublicExport(),
		"event":   event.PublicExport(),
	})
	if err != nil {
		return err
	}

	// Prepare and send email
	userEmail, _ := user.Get("email").(string)
	message := &mailer.Message{
		From: mail.Address{
			Address: app.Settings().Meta.SenderAddress,
			Name:    app.Settings().Meta.SenderName,
		},
		To:      []mail.Address{{Address: userEmail}},
		Subject: subject,
		HTML:    html,
	}

	app.Logger().Info("[NotifyUserBookingChanged] send email", "recipient", userEmail)

	return app.NewMailClient().Send(message)
}
