package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// AnswerInput represents the input for a single answer.
type AnswerInput struct {
	Id    string
	Value interface{}
}

// UpsertAnswers saves answers for a given event and user.
// answers: map of questionID to AnswerInput
// Returns the records or an error.
func UpsertAnswers(app *pocketbase.PocketBase, eventId string, userId string, input map[string]AnswerInput) ([]*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("answers")
	if err != nil {
		return nil, err
	}

	var records []*core.Record

	for questionId, answer := range input {
		var record *core.Record
		if answer.Id != "" {
			record, err = app.FindRecordById("answers", answer.Id)
			if err != nil {
				return nil, err
			}
		} else {
			record = core.NewRecord(collection)
		}

		record.Set("user", userId)
		record.Set("event", eventId)
		record.Set("value", answer.Value)
		record.Set("question", questionId)

		err = app.Save(record)
		if err != nil {
			return nil, err
		}

		app.Logger().Info("[answer] upsert answer", "id", record.Id)

		records = append(records, record)
	}

	return records, nil
}
