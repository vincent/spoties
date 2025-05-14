/**
 * Save locations and their slots for an event.
 * @param {object} $app - Application context
 * @param {Array} locations - Array of location objects (form.locations)
 * @param {object} eventRecord - The event record being saved/updated
 */
module.exports = function saveLocations($app, locations, eventRecord) {
  let LOCATIONS = $app.findCollectionByNameOrId('locations');
  let SLOTS = $app.findCollectionByNameOrId('time_slots');

  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    let lRecord = loc.id
      ? $app.findRecordById('locations', loc.id)
      : new Record(LOCATIONS);
    lRecord.set('event', eventRecord.id);
    lRecord.set('name', loc.name);
    lRecord.set('description', loc.description);
    lRecord.set('geo_place', loc.geo_place);
    lRecord.set('deleted', loc.deleted);
    $app.save(lRecord);

    $app.logger().info(`[event] ${loc.id ? 'updated' : 'inserted'} event ${eventRecord.id} location ${lRecord.id}`);
    Object.assign(loc, lRecord.fieldsData());

    for (let j = 0; j < loc.slots.length; j++) {
      const slot = loc.slots[j];
      let sRecord = slot.id
        ? $app.findRecordById('time_slots', slot.id)
        : new Record(SLOTS);
      sRecord.set('event', eventRecord.id);
      sRecord.set('location', lRecord.id);
      sRecord.set('label', slot.label);
      sRecord.set('description', slot.description);
      sRecord.set('starts_at', slot.starts_at);
      sRecord.set('duration', slot.duration);
      sRecord.set('limit', slot.limit);
      sRecord.set('deleted', slot.deleted);
      $app.save(sRecord);

      $app.logger().info(`[event] ${slot.id ? 'updated' : 'inserted'} event ${eventRecord.id} slot ${sRecord.id}`);
      Object.assign(slot, sRecord.fieldsData());
    }
  }
}
