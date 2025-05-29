// Package pb_routes provides custom route handlers for admin manual booking.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

type bookingRequest struct {
	services.BookingForm
	Notify bool `json:"notify"`
}

// RegisterAdminManualBookingRoute registers the POST /api/admin/events/:eventId/saveManualBooking route.
func RegisterAdminManualBookingRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/admin/events/{eventId}/saveManualBooking", func(e *core.RequestEvent) error {

			// Get eventId from path params
			eventId := e.Request.PathValue("eventId")
			if eventId == "" {
				return e.JSON(http.StatusForbidden, map[string]string{"error": "Missing eventId"})
			}

			// Parse request body
			var req bookingRequest
			if err := e.BindBody(&req); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			// Save or update booking
			_, err := services.UpsertBooking(app, &req.BookingForm, eventId, e.Auth.Id)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save booking"})
			}

			// Notify if requested
			if req.Notify {
				_ = services.NotifyUserBookingChanged(app, eventId, e.Auth.Id)
			}

			return e.JSON(http.StatusOK, map[string]string{"status": "ok"})

		}).Bind(apis.RequireAuth("users"))

		return se.Next()
	})
}
