package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// SlotInput represents the input for a single time slot.
type SlotInput struct {
	Id          string `json:"id"`
	Label       string `json:"label"`
	Description string `json:"description"`
	StartsAt    string `json:"starts_at"`
	Duration    int    `json:"duration"`
	Limit       int    `json:"limit"`
	Deleted     bool   `json:"deleted"`
}

// LocationInput represents the input for a single location and its slots.
type LocationInput struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	GeoPlace    string      `json:"geo_place"`
	Deleted     bool        `json:"deleted"`
	Slots       []SlotInput `json:"slots"`
}

// UpsertLocations saves locations and their slots for an event.
// locations: slice of LocationInput (form.locations)
// eventId: the event record ID being saved/updated
func UpsertLocations(app *pocketbase.PocketBase, input []LocationInput, eventId string) ([]*core.Record, error) {
	locationCollection, err := app.FindCollectionByNameOrId("locations")
	if err != nil {
		return nil, err
	}
	slotCollection, err := app.FindCollectionByNameOrId("time_slots")
	if err != nil {
		return nil, err
	}

	for i := range input {
		loc := &input[i]
		var record *core.Record
		if loc.Id != "" {
			record, err = app.FindRecordById("locations", loc.Id)
			if err != nil {
				return nil, err
			}
		} else {
			record = core.NewRecord(locationCollection)
		}

		record.Set("event", eventId)
		record.Set("name", loc.Name)
		record.Set("description", loc.Description)
		record.Set("geo_place", loc.GeoPlace)
		record.Set("deleted", loc.Deleted)

		err = app.Save(record)
		if err != nil {
			return nil, err
		}

		app.Logger().Info("[event] upsert event location", "event", eventId, "location", record.Id)

		// Update the input struct with the saved record fields if needed
		// (not strictly necessary unless you want to return updated fields)

		for j := range loc.Slots {
			slot := &loc.Slots[j]
			var sRecord *core.Record
			if slot.Id != "" {
				sRecord, err = app.FindRecordById("time_slots", slot.Id)
				if err != nil {
					return nil, err
				}
			} else {
				sRecord = core.NewRecord(slotCollection)
			}

			sRecord.Set("event", eventId)
			sRecord.Set("label", slot.Label)
			sRecord.Set("limit", slot.Limit)
			sRecord.Set("location", record.Id)
			sRecord.Set("deleted", slot.Deleted)
			sRecord.Set("duration", slot.Duration)
			sRecord.Set("starts_at", slot.StartsAt)
			sRecord.Set("description", slot.Description)

			err = app.Save(sRecord)
			if err != nil {
				return nil, err
			}

			app.Logger().Info("[event] upsert event slot", "event", eventId, "slot", sRecord.Id)
			// Optionally update slot struct with saved fields
		}
	}

	return nil, nil
}
