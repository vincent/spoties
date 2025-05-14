module.exports = {
  saveQuestions
}

/**
 * Updates or inserts questions for a given event.
 * @param {Array} questions - Array of question objects to update/insert.
 * @param {Object} eventRecord - The event record (must have .id and .fieldsData()).
 * @param {Object} $app - The app context for database operations and logging.
 */
function saveQuestions($app, questions, eventRecord) {
  let QUESTIONS = $app.findCollectionByNameOrId('questions');
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    let qRecord = q.id
      ? $app.findRecordById('questions', q.id)
      : new Record(QUESTIONS);
    qRecord.set('event', eventRecord.id);
    qRecord.set('entity', 'event');
    qRecord.set('entity_id', eventRecord.id);
    qRecord.set('rank', q.rank);
    qRecord.set('label', q.label);
    qRecord.set('answer_type', q.answer_type);
    qRecord.set('properties', q.properties);
    qRecord.set('required', q.required);
    qRecord.set('deleted', q.deleted);
    $app.save(qRecord);

    $app.logger().info(
      `[event] ${q.id ? 'updated' : 'inserted'} event ${eventRecord.id} question ${qRecord.id}`
    );
    Object.assign(q, qRecord.fieldsData());
  }
}
