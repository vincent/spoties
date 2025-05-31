package services

import (
	"github.com/pocketbase/pocketbase"
)

func DeleteAllUserData(app *pocketbase.PocketBase, userId string) error {

	// Find the user
	userRecord, err := app.FindRecordById("users", userId)
	if err != nil {
		return err
	}

	// Delete all answers related to the user
	answersCollection, err := app.FindCollectionByNameOrId("answers")
	if err != nil {
		return err
	}
	answerRecords, err := app.FindRecordsByFilter(
		answersCollection,
		"user = {:userId}",
		"",   // no sort
		1,    // page
		1000, // perPage (adjust as needed)
		map[string]any{"userId": userId},
	)
	if err != nil {
		return err
	}
	for _, rec := range answerRecords {
		app.Logger().Info("[user-delete] delete answer", "id", rec.Id)
		if err := app.Delete(rec); err != nil {
			return err
		}
	}

	// Delete all bookings related to the user
	bookingsCollection, err := app.FindCollectionByNameOrId("bookings")
	if err != nil {
		return err
	}
	bookingRecords, err := app.FindRecordsByFilter(
		bookingsCollection,
		"user = {:userId}",
		"",   // no sort
		1,    // page
		1000, // perPage (adjust as needed)
		map[string]any{"userId": userId},
	)
	if err != nil {
		return err
	}
	for _, rec := range bookingRecords {
		app.Logger().Info("[user-delete] delete booking", "id", rec.Id)
		if err := app.Delete(rec); err != nil {
			return err
		}
	}

	// Delete the user account itself
	app.Logger().Info("[user-delete] delete user", "id", userRecord.Id)
	if err := app.Delete(userRecord); err != nil {
		return err
	}

	return nil
}
