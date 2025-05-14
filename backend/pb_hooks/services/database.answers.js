/**
 * Save answers for a given event and user.
 * @param {object} $app - The app context.
 * @param {object} questions_answers - The answers keyed by question ID.
 * @param {string} eventId - The event ID.
 * @param {string} userId - The user ID.
 */
function saveAnswers($app, questions_answers, eventId, userId) {
  let ANSWERS = $app.findCollectionByNameOrId('answers');
  Object.entries(questions_answers).forEach(([qid, qa]) => {
    let record = qa.id
      ? $app.findRecordById('answers', qa.id)
      : new Record(ANSWERS);
    record.set('event', eventId);
    record.set('user', userId);
    record.set('question', qid);
    record.set('value', qa.value);
    $app.save(record);

    $app.logger().info(`[answer] ${qa.id ? 'updated' : 'inserted'} answer ${record.id}`);
    Object.assign(qa, record.fieldsData());
  });
}

module.exports = { saveAnswers };
