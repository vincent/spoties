package hooks

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
)

func Register(app *pocketbase.PocketBase) {
	modelHandler := func(event string) func(e *core.ModelEvent) error {
		return func(e *core.ModelEvent) error {
			table := e.Model.TableName()
			// we don't want to executeEventActions if the event is a system event (e.g. "_collections" changes)
			if record, ok := e.Model.(*models.Record); ok {
				if table == "hooks" {
					log.Println("'hooks' collection changed. Unloading.")
					hookRowsMap = nil // just set it to nil and it will get re-loaded the next time it is needed
				} else {
					executeEventActions(app, event, table, record)
				}
			} else {
				log.Println("Skipping executeEventActions for table:", table)
			}
			return nil
		}
	}
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		ensureSchema(app.Dao().DB())
		// watch insert/update/delete of rows of all collections
		app.OnModelAfterCreate().Add(modelHandler("insert"))
		app.OnModelAfterUpdate().Add(modelHandler("update"))
		app.OnModelAfterDelete().Add(modelHandler("delete"))
		return nil
	})
}

// cache of "hooks" table rows (all where disabled=false)
// key=collection:event, value=array-of-rows
var hookRowsMap map[string][]dbx.NullStringMap

func loadHookRows(db *dbx.DB) {
	if hookRowsMap != nil {
		return // already loaded (cached)
	}
	hookRowsMap = make(map[string][]dbx.NullStringMap)
	var rows []dbx.NullStringMap
	db.Select("*").
		From("hooks").
		Where(dbx.HashExp{"disabled": false}). // exclude "disabled" rows
		All(&rows)
	for _, row := range rows {
		collection := row["collection"].String
		event := row["event"].String
		key := collection + ":" + event
		hookRowsMap[key] = append(hookRowsMap[key], row)
	}
}

func getHookRows(db *dbx.DB, collection, event string) []dbx.NullStringMap {
	loadHookRows(db)
	key := collection + ":" + event
	return hookRowsMap[key]
}

func executeEventActions(app *pocketbase.PocketBase, event string, table string, record *models.Record) {
	rows := getHookRows(app.DB(), table, event)
	for _, row := range rows {
		action_type := row["action_type"].String
		action := row["action"].String
		action_params := row["action_params"].String
		expands := strings.Split(row["expands"].String, ",")
		app.Dao().ExpandRecord(record, expands, func(c *models.Collection, ids []string) ([]*models.Record, error) {
			return app.Dao().FindRecordsByIds(c.Name, ids, nil)
		})
		if err := executeEventAction(app, event, table, action_type, action, action_params, record); err != nil {
			log.Println("ERROR", err)
		}
	}
}

func executeEventAction(app *pocketbase.PocketBase, event, table, action_type, action, action_params string, record *models.Record) error {
	log.Printf("event:%s, table: %s, action: %s\n", event, table, action)
	switch action_type {
	case "command":
		return doCommand(action, action_params, record)
	case "post":
		return doPost(action, action_params, record)
	case "email":
		return doEmail(app, action, action_params, record)
	default:
		return errors.New(fmt.Sprintf("Unknown action_type: %s", action_type))
	}
}

func doCommand(action, action_params string, record *models.Record) error {
	cmd := exec.Command(action, action_params)
	if w, err := cmd.StdinPipe(); err != nil {
		return err
	} else {
		if r, err := cmd.StdoutPipe(); err != nil {
			return err
		} else {
			go func() {
				defer w.Close()
				defer r.Close()
				log.Println("-------------------------------")
				defer log.Println("-------------------------------")
				if err := cmd.Start(); err != nil {
					log.Printf("command start failed: %s %+v\n", action, err)
				} else {
					// write JSON into the pipe and close
					json.NewEncoder(w).Encode(record)
					w.Close()
					if err := cmd.Wait(); err != nil {
						log.Printf("command wait failed: %s %+v\n", action, err)
					}
				}
			}()
			// read pipe's stdout and copy to ours (in parallel to the above goroutine)
			io.Copy(os.Stdout, r)
		}
	}
	return nil
}

func doPost(action, action_params string, record *models.Record) error {
	r, w := io.Pipe()
	defer w.Close()
	go func() {
		defer r.Close()
		if resp, err := http.Post(action, "application/json", r); err != nil {
			log.Println("POST failed", action, err)
		} else {
			io.Copy(os.Stdout, resp.Body)
		}
	}()
	if err := json.NewEncoder(w).Encode(record); err != nil {
		log.Println("ERROR writing to pipe", err)
	}
	return nil
}

func ensureSchema(db dbx.Builder) error {
	// add up queries...
	jsonData := `[
			{
				"id": "3fhw2mfr9zrgodj",
				"created": "2022-12-23 22:30:35.443Z",
				"updated": "2024-05-27 18:57:06.058Z",
				"name": "hooks",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "j8mewfur",
						"name": "collection",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "4xcxcfuv",
						"name": "event",
						"type": "select",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"insert",
								"update",
								"delete"
							]
						}
					},
					{
						"system": false,
						"id": "u3bmgjpb",
						"name": "action_type",
						"type": "select",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"command",
								"email",
								"post"
							]
						}
					},
					{
						"system": false,
						"id": "kayyu1l3",
						"name": "action",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "zkengev8",
						"name": "action_params",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "balsaeka",
						"name": "expands",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "emgxgcok",
						"name": "disabled",
						"type": "bool",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {}
					}
				],
				"indexes": [],
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			}
	]`

	collections := []*models.Collection{}
	if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
		return err
	}

	return daos.New(db).ImportCollections(collections, false, nil)
}
