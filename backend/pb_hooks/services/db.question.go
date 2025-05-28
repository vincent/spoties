package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// QuestionInput represents the input for a single question.
type QuestionInput struct {
	Id         string      `json:"id"`
	Rank       int         `json:"rank"`
	Label      string      `json:"label"`
	AnswerType string      `json:"answer_type"`
	Properties interface{} `json:"properties"`
	Required   bool        `json:"required"`
	Deleted    bool        `json:"deleted"`
}

// UpsertQuestions updates or inserts questions for a given event.
// Returns the updated records or an error.
func UpsertQuestions(app *pocketbase.PocketBase, eventId string, questions []QuestionInput) ([]*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return nil, err
	}

	var records []*core.Record

	for _, q := range questions {
		var record *core.Record
		if q.Id != "" {
			record, err = app.FindRecordById("questions", q.Id)
			if err != nil {
				return nil, err
			}
		} else {
			record = core.NewRecord(collection)
		}

		record.Set("event", eventId)
		record.Set("entity", "event")
		record.Set("entity_id", eventId)
		record.Set("rank", q.Rank)
		record.Set("label", q.Label)
		record.Set("answer_type", q.AnswerType)
		record.Set("properties", q.Properties)
		record.Set("required", q.Required)
		record.Set("deleted", q.Deleted)

		err = app.Save(record)
		if err != nil {
			return nil, err
		}

		app.Logger().Info("[event] upsert event question", "eventId", eventId, "questionId", record.Id)

		records = append(records, record)
	}

	return records, nil
}
