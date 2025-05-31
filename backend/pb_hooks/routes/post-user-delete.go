// Package pb_routes provides custom route handlers for event owner notification.
package pb_routes

import (
	"net/http"

	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// RegisterUserDeleteRoute registers the POST /api/user/delete route.
func RegisterUserDeleteRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/user/delete", func(e *core.RequestEvent) error {

			// Call the notification service
			err := services.DeleteAllUserData(app, e.Auth.Id)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
			}

			return e.JSON(http.StatusOK, nil)

		}).Bind(apis.RequireAuth("users"))

		return se.Next()
	})
}
