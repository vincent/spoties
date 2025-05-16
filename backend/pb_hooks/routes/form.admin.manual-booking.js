/// <reference path='../../pb_data/types.d.ts' />

/**
 * POST /api/admin/events/{eventId}/saveManualBooking
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
  '/api/admin/events/{eventId}/saveManualBooking',
  (c) => {
    let form = c.requestInfo().body
    let eventId = c.request.pathValue('eventId')
    $app.logger().info(`[event] post`, JSON.stringify(form))

    const { saveBooking } = require(`${__hooks}/./services/database.bookings`)
    const { notifyBookingChanged } = require(`${__hooks}/./services/notify.user.booking-changed`)

    saveBooking($app, form, eventId, c.auth.id)

    if (form.notify) notifyBookingChanged(eventId, c.auth.id)

    c.next()
  },
  $apis.requireAuth()
)
