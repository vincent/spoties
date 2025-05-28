package services

import (
	"errors"
	"slices"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// EventInput represents the input for saving an event.
type EventInput struct {
	Id          string
	Team        string
	Title       string
	Description string
	Published   bool
	Sealed      bool
}

// UpsertEvent creates or updates an event record.
// If Team is not provided, it uses the first team from the user's teams.
func UpsertEvent(app *pocketbase.PocketBase, input *EventInput, auth core.Record) (*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("events")
	if err != nil {
		return nil, err
	}

	var record *core.Record
	if input.Id != "" {
		record, err = app.FindRecordById("events", input.Id)
		if err != nil {
			return nil, err
		}
	} else {
		record = core.NewRecord(collection)
	}

	// Get user's teams from auth.FieldsData()["teams"]
	teamsRaw, ok := auth.FieldsData()["teams"]
	var teamIds []string
	if ok {
		switch t := teamsRaw.(type) {
		case []interface{}:
			for _, v := range t {
				if s, ok := v.(string); ok {
					teamIds = append(teamIds, s)
				}
			}
		case []string:
			teamIds = t
		}
	}

	if input.Team != "" && !slices.Contains(teamIds, input.Team) {
		return nil, errors.New("no such team")
	}

	if len(teamIds) > 0 {
		input.Team = teamIds[0]
	} else {
		// Create a new team for the user using UpsertTeam
		teamRecord, err := UpsertTeam(app, TeamInput{
			Owner: auth.Id,
		})
		if err != nil {
			return nil, err
		}
		input.Team = teamRecord.Id
	}

	record.Set("team", input.Team)
	record.Set("title", input.Title)
	record.Set("description", input.Description)
	record.Set("published", input.Published)
	record.Set("sealed", input.Sealed)

	err = app.Save(record)
	if err != nil {
		return nil, err
	}

	app.Logger().Info("[event] upsert event", "id", record.Id)

	return record, nil
}
