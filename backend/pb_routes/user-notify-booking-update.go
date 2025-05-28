// Package pb_routes provides custom route handlers for event owner notification.
package pb_routes

import (
	"net/http"

	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// notifyOwnerRequest represents the expected request body for the notify owner route.
type notifyOwnerRequest struct {
	IsUpdating bool `json:"isUpdating"`
}

// RegisterNotifyOwnerRoute registers the POST /api/events/:eventId/notify/owner route.
func RegisterNotifyOwnerRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/events/{eventId}/notify/owner", func(e *core.RequestEvent) error {
			// Get eventId from path params
			eventId := e.Request.PathValue("eventId")
			if eventId == "" {
				return e.JSON(http.StatusForbidden, map[string]string{"error": "Missing eventId"})
			}

			// Parse request body
			var req notifyOwnerRequest
			_ = e.BindBody(&req) // ignore error, isUpdating is optional

			// Call the notification service
			err := services.NotifyEventResponse(app, eventId, e.Auth.Id, req.IsUpdating)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
			}

			return e.JSON(http.StatusOK, map[string]any{"success": true})

		}).Bind(apis.RequireAuth("users"))

		return se.Next()
	})
}
