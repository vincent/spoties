/// <reference path='../../pb_data/types.d.ts' />

/** @type {(any, core.Record): core.Record} */
module.exports = function saveEvent($app, form, auth) {
  let EVENTS = $app.findCollectionByNameOrId('events')
  let eventRecord = form.id
    ? $app.findRecordById('events', form.id)
    : new Record(EVENTS)
  eventRecord.set('team', auth.fieldsData().teams[0])
  eventRecord.set('title', form.title)
  eventRecord.set('description', form.description)
  // record.set('public_access_link', '')
  eventRecord.set('published', form.published)
  eventRecord.set('sealed', form.sealed)
  eventRecord.set('theme', form.theme)
  $app.save(eventRecord)

  $app.logger().info(`[event] ${form.id ? 'updated' : 'inserted'} event ${eventRecord.id}`)
  Object.assign(form, eventRecord.fieldsData())
}
