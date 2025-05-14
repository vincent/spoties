/**
 * Save or update a booking record in the database.
 * @param {object} $app - The app context.
 * @param {object} bookingForm - The booking form object (form.bookings).
 * @param {string} eventId - The event ID.
 * @param {string} userId - The user ID (c.auth.id).
 * @returns {object} The updated bookingForm object.
 */
function saveBooking($app, bookingForm, eventId, userId) {
  let BOOKINGS = $app.findCollectionByNameOrId('bookings');
  let record = bookingForm.id
    ? $app.findRecordById('bookings', bookingForm.id)
    : new Record(BOOKINGS);
  record.set('event', eventId);
  record.set('user', userId);
  record.set('slots', Object.keys(bookingForm.slots).filter((sid) => !!bookingForm.slots[sid]));
  $app.save(record);

  $app.logger().info(`[answer] ${bookingForm.id ? 'updated' : 'inserted'} booking ${record.id}`);
  Object.assign(bookingForm, record.fieldsData());
  return bookingForm;
}

module.exports = {
  saveBooking,
};
