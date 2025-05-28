package services

import (
	"errors"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// TeamInput represents the input for creating or updating a team.
type TeamInput struct {
	Id    string
	Owner string
}

// UpsertTeam creates or updates a team and updates the owner's teams field.
// Returns the team record or an error.
func UpsertTeam(app *pocketbase.PocketBase, input TeamInput) (*core.Record, error) {
	// Find the owner user record
	owner, err := app.FindRecordById("users", input.Owner)
	if err != nil || owner == nil {
		return nil, errors.New("no such user")
	}

	// Find or create the team record
	var team *core.Record
	if input.Id != "" {
		team, err = app.FindRecordById("teams", input.Id)
		if err != nil {
			return nil, err
		}
	} else {
		collection, err := app.FindCollectionByNameOrId("teams")
		if err != nil {
			return nil, err
		}
		team = core.NewRecord(collection)
	}

	team.Set("owner", owner.Id)

	// Save the team record
	if err := app.Save(team); err != nil {
		return nil, err
	}

	// Update the owner's teams field
	owner.Set("teams", []string{team.Id})
	if err := app.Save(owner); err != nil {
		return nil, err
	}
	app.Logger().Info("[team] updated owner", "id", owner.Id, "team", team.Id)

	return team, nil
}
