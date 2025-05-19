/// <reference path='../../pb_data/types.d.ts' />

module.exports = {
  saveEvent
}

/**
 * Save an event.
 * @param {object} $app - Application context
 * @param {object} form - Event form
 * @param {object} auth - The current user auth Record
 */
function saveEvent($app, form, auth) {
  const { createTeam } = require(`${__hooks}/./services/database.teams`)

  let eventRecord = form.id
    ? $app.findRecordById('events', form.id)
    : new Record($app.findCollectionByNameOrId('events'))

    const teamIds = auth.fieldsData().teams
    if (form.team) {
      if (!teamIds.includes(form.team))
        throw new Error('No such team');

    } else {
      const team = teamIds?.length
        ? $app.findRecordById('teams', teamIds[0])
        : createTeam($app, { owner: auth.id })

      form.team = team.id
    }

  eventRecord.set('team', form.team)
  eventRecord.set('title', form.title)
  eventRecord.set('description', form.description)
  // record.set('public_access_link', '')
  eventRecord.set('published', form.published)
  eventRecord.set('sealed', form.sealed)

  $app.logger().info(`[event] post`, JSON.stringify(eventRecord.fieldsData()))

  $app.save(eventRecord)

  $app.logger().info(`[event] ${form.id ? 'updated' : 'inserted'} event ${eventRecord.id}`)
  Object.assign(form, eventRecord.fieldsData())
}
