/// <reference path='../../pb_data/types.d.ts' />

/**
 * POST /api/events/{eventId}/answer
 * 
 * Insert or update an answer for the given event.
 * - Path parameter: eventId (string) — the ID of the event.
 * - Request body: the user answer
 * - Requires authentication.
 * - If event or auth is missing, returns 403 Forbidden.
 * - On success, triggers notifyEventResponse and returns 200 OK.
 */
routerAdd(
  'POST',
  '/api/admin/events',
  (c) => {
    let form = c.requestInfo().body
    $app.logger().info(`[event] post`, JSON.stringify(form))

    const { validateEventForm } = require(`${__hooks}/./services/form.admin.event.validation`)
    const { saveQuestions } = require(`${__hooks}/./services/database.question`)
    const { saveLocations } = require(`${__hooks}/./services/database.location`)
    const { saveEvent } = require(`${__hooks}/./services/database.event`)

    const validation = validateEventForm(form)
    if (!validation.success) return c.badRequestError(JSON.stringify(validation.errors))

    saveEvent($app, form, c.auth)
    saveQuestions($app, form.questions, form)
    saveLocations($app, form.locations, form)
  },
  $apis.requireAuth()
)
