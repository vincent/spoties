// Package pb_routes provides custom route handlers for admin event form submissions.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// eventRequest represents the expected request body for the admin event form.
type eventRequest struct {
	services.EventInput `json:",inline"`
	Questions           []services.QuestionInput `json:"questions"`
	Locations           []services.LocationInput `json:"locations"`
}

// RegisterAdminEventRoute registers the POST /api/admin/events route.
func RegisterAdminEventRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/admin/events", func(e *core.RequestEvent) error {

			// Parse request body
			var form eventRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			// Save or update event
			eventRecord, err := services.UpsertEvent(app, &form.EventInput, *e.Auth)
			if err != nil {
				app.Logger().Error("Failed to save event", "error", err)
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save event"})
			}

			// Save questions
			if _, err := services.UpsertQuestions(app, eventRecord.Id, form.Questions); err != nil {
				app.Logger().Error("Failed to save questions", "error", err)
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save questions"})
			}

			// Save locations
			if _, err := services.UpsertLocations(app, form.Locations, eventRecord.Id); err != nil {
				app.Logger().Error("Failed to save locations", "error", err)
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save locations"})
			}

			return e.JSON(http.StatusOK, map[string]string{"id": eventRecord.Id})

		}).Bind(apis.RequireAuth("users"))

		return se.Next()
	})
}
