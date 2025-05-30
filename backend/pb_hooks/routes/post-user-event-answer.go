// Package pb_routes provides custom route handlers for user event answers.
package pb_routes

import (
	"net/http"
	"time"

	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// userEventAnswerRequest represents the expected request body for user event answers.
type userEventAnswerRequest struct {
	QuestionsAnswers map[string]services.AnswerInput `json:"questions_answers"`
	Bookings         services.BookingForm            `json:"bookings"`
}

// RegisterUserEventAnswerRoute registers the POST /api/events/:eventId/answer route.
func RegisterUserEventAnswerRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/events/{eventId}/answer", func(e *core.RequestEvent) error {

			// Get eventId from path params
			eventId := e.Request.PathValue("eventId")
			if eventId == "" {
				return e.JSON(http.StatusForbidden, map[string]string{"error": "Missing eventId"})
			}

			// Parse request body
			var req userEventAnswerRequest
			if err := e.BindBody(&req); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			// Determine if updating or creating booking
			isUpdating := req.Bookings.Id != ""
			notifyOwner := !isUpdating
			notifyUser := !isUpdating

			if isUpdating {
				// Try to fetch the booking to check updated time
				bookingRecord, err := app.FindRecordById("bookings", req.Bookings.Id)
				if err == nil {
					updatedStr, _ := bookingRecord.Get("updated").(string)
					if updatedStr != "" {
						updatedTime, err := time.Parse(time.RFC3339, updatedStr)
						if err == nil {
							twelveHoursAgo := time.Now().Add(-12 * time.Hour)
							notifyOwner = updatedTime.Before(twelveHoursAgo)
						}
					}
				}
			}

			app.Logger().Info("[answer] notify", "isUpdating", isUpdating, "notifyOwner", notifyOwner)

			// Upsert answers
			_, err := services.UpsertAnswers(app, eventId, e.Auth.Id, req.QuestionsAnswers)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save answers"})
			}

			// Upsert booking
			bookingRecord, err := services.UpsertBooking(app, &req.Bookings, eventId, e.Auth.Id)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save booking"})
			}

			// Notify owner if needed
			if notifyOwner {
				err = services.NotifyEventResponse(app, eventId, e.Auth.Id, isUpdating)
				if err != nil {
					app.Logger().Warn("[answer] cannot notify owner", "error", err)
				}
			}
			// Notify user if needed
			if notifyUser {
				err = services.AcknowledgeUserEventResponse(app, eventId, e.Auth.Id, bookingRecord.Id)
				if err != nil {
					app.Logger().Warn("[answer] cannot notify owner", "error", err)
				}
			}

			return e.JSON(http.StatusOK, map[string]string{"status": "ok"})

		}).Bind(apis.RequireAuth("users"))

		return se.Next()
	})
}
