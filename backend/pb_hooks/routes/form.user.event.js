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
  '/api/events/{eventId}/answer',
  (c) => {
    let eventId = c.request.pathValue('eventId')
    let form = c.requestInfo().body

    const { validateResponseForm } = require(`${__hooks}/./services/form.user.response.validation`)
    const { notifyEventResponse } = require(`${__hooks}/./services/notify.owner`)
    const { saveBooking } = require(`${__hooks}/./services/database.bookings`)
    const { saveAnswers } = require(`${__hooks}/./services/database.answers`)

    const validation = validateResponseForm(form)
    if (!validation.success) return c.badRequestError(JSON.stringify(validation.errors))
  
    const isUpdating = !!form.bookings.id
    let notifyOwner = !isUpdating

    if (isUpdating) {
      const dateUpdated = +(new Date(form.bookings.updated))
      const twelveHoursAgo = +(new Date()) - (12 * 60 * 60 * 1000)
      notifyOwner = dateUpdated < twelveHoursAgo
    }

    saveAnswers($app, form.questions_answers, eventId, c.auth.id);
    saveBooking($app, form.bookings, eventId, c.auth.id);

    if (notifyOwner) notifyEventResponse(eventId, c.auth.id, isUpdating)
  },
  $apis.requireAuth()
)
