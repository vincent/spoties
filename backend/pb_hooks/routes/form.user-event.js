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

    const { z } = require(`${__hooks}/./zod`)

    function questionValidator(q) {
      if (!q.required) return z.any()
      if (q.answer_type === 'checkboxes') return z.object({ value: z.string().array() })
      return z.object({
        // value: z.union([ z.number(), z.string() ], { message: translate(get(locale), 'errors.required') })
        value: z.coerce
          .string()
          .min(1)
          .refine(val => (val !== 'null') ? val : '', { message: 'errors.required' })
      })
    }
  
    let schema = z.object({
      questions_answers: z.object(
        Object
          .keys(form.questions_answers)
          .reduce((acc, qid) => ({
            ...acc,
            [qid]: questionValidator(form.questions_answers[qid].question)
          }), {})
      ),
      bookings: z.object({
        slots: z.object({})
      }),
    })

    const validation = schema.safeParse(form)
    if (!validation.success) return c.badRequestError(JSON.stringify(validation.errors))
  
    const isUpdating = !!form.bookings.id
    let notifyOwner = !isUpdating

    if (isUpdating) {
      const dateUpdated = +(new Date(form.bookings.updated))
      const twelveHoursAgo = +(new Date()) - (12 * 60 * 60 * 1000)
      notifyOwner = dateUpdated < twelveHoursAgo
    }

    let ANSWERS = $app.findCollectionByNameOrId('answers')
    Object.entries(form.questions_answers).forEach(([qid, qa]) => {
      let record = qa.id
        ? $app.findRecordById('answers', qa.id)
        : new Record(ANSWERS)
      record.set('event', eventId)
      record.set('user', c.auth.id)
      record.set('question', qid)
      record.set('value', qa.value)
      $app.save(record)

      $app.logger().info(`[answer] ${qa.id ? 'updated' : 'inserted'} answer ${record.id}`)
      Object.assign(qa, record.fieldsData())
    })

    let BOOKINGS = $app.findCollectionByNameOrId('bookings')
    let record = form.bookings.id
      ? $app.findRecordById('bookings', form.bookings.id)
      : new Record(BOOKINGS)
    record.set('event', eventId)
    record.set('user', c.auth.id)
    record.set('slots', Object.keys(form.bookings.slots).filter(sid => !!form.bookings.slots[sid]))
    $app.save(record)

    $app.logger().info(`[answer] ${form.bookings.id ? 'updated' : 'inserted'} booking ${record.id}`)
    Object.assign(form.bookings, record.fieldsData())

    if (notifyOwner) {
      $app.logger().info(`[answer] should notify the owner`)
      const { notifyEventResponse } = require(`${__hooks}/./lib/notify.owner`)
      notifyEventResponse(eventId, c.auth.id, isUpdating)
    }
  },
  $apis.requireAuth()
)
