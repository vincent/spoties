// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"

	"encoding/json"
	"os"
	"path/filepath"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// RegisterConfigRoute registers the /api/config GET route.
func RegisterConfigRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/api/config", func(e *core.RequestEvent) error {
			// Read config.json from backend/pb_hooks/config.json
			configPath := filepath.Join(hooksDir, "config.json")
			configFile, err := os.Open(configPath)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to open config.json"})
			}
			defer configFile.Close()

			var config map[string]interface{}
			if err := json.NewDecoder(configFile).Decode(&config); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to parse config.json"})
			}

			// Get app settings
			settings := app.Settings()

			// Merge settings into config.site
			site, ok := config["site"].(map[string]interface{})
			if !ok {
				site = make(map[string]interface{})
				config["site"] = site
			}
			site["url"] = settings.Meta.AppURL
			site["name"] = settings.Meta.AppName

			return e.JSON(http.StatusOK, config)
		})

		return se.Next()
	})
}
