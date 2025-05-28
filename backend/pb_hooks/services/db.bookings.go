package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// BookingForm represents the input for a booking.
type BookingForm struct {
	Id    string
	Slots map[string]bool
}

// UpsertBooking saves or updates a booking record in the database.
// Returns the record or an error.
func UpsertBooking(app *pocketbase.PocketBase, input *BookingForm, eventId string, userId string) (*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("bookings")
	if err != nil {
		return nil, err
	}

	var record *core.Record
	if input.Id != "" {
		record, err = app.FindRecordById("bookings", input.Id)
		if err != nil {
			return nil, err
		}
	} else {
		record = core.NewRecord(collection)
	}

	record.Set("event", eventId)
	record.Set("user", userId)

	// Collect slot IDs where value is true
	var slots []string
	for slotID, selected := range input.Slots {
		if selected {
			slots = append(slots, slotID)
		}
	}
	record.Set("slots", slots)

	err = app.Save(record)
	if err != nil {
		return nil, err
	}

	app.Logger().Info("[booking] upsert booking", "id", record.Id)

	return record, nil
}
