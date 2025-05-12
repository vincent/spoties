/// <reference path='../../pb_data/types.d.ts' />

/**
 * POST /api/events/{eventId}/notify/owner
 * 
 * Notifies the owner of a specific event.
 * - Path parameter: eventId (string) — the ID of the event to notify the owner about.
 * - Request body: { isUpdating?: boolean }
 * - Requires authentication.
 * - If event or auth is missing, returns 403 Forbidden.
 * - On success, triggers notifyEventResponse and returns 200 OK.
 */
routerAdd(
  'POST',
  '/api/events/{eventId}/notify/owner',
  (c) => {
    $app.logger().info(`[notifyEventResponse]`)

    let info = c.requestInfo();
    let auth = info.auth;
    let eventId = c.request.pathValue('eventId')
    let isUpdating = c.requestInfo().body?.isUpdating
    if (!auth || !eventId) return c.forbiddenError('No such event');
    
    let record = $app.findRecordById('events', eventId)
    if (!record) return c.forbiddenError('No such event');

    notifyEventResponse(eventId, auth.id, isUpdating)

    return c.json(200, { success: true });
  },
  $apis.requireAuth()
);

function notifyEventResponse(eventId, userId, isUpdating) {
  if (!userId || !eventId) return new Error('Invalid params');
  
  let event = $app.findRecordById('events', eventId);
  $app.expandRecord(event, ['team'], null);

  let user = $app.findRecordById('users', userId);
  if (!user) return new Error('No such user');

  if (!event) return new Error('No such event');
  let team = event.expand().team;

  let owner = $app.findRecordById('users', team.fieldsData().owner);
  owner.setEmailVisibility(true);
  $app.logger().info(`[notifyEventResponse] found ${JSON.stringify(owner)}`);
  if (!owner) return new Error('No such event');

  $app.logger().info(`[notifyEventResponse] send email to ${owner.fieldsData().email}`)
  $app.newMailClient().send(eventResponseMail(event.fieldsData(), owner.fieldsData(), user.fieldsData(), isUpdating));

  return null
}

function eventResponseMail(event, owner, responder, isUpdating = false) {
  const { stripTags } = require(`${__hooks}/./util`);

  const appURL = $app.settings().meta.appURL;
  const name = $app.settings().meta.senderName;
  const address = $app.settings().meta.senderAddress;
  const subject = `${!isUpdating ? 'New response' : 'Updated response'} on event ${event.title.slice(0, 20)}`;
  const html = `Hello ${owner.username},
\n<br>
<strong>${responder.username}</strong> has ${!isUpdating ? 'posted a new response' : 'updated their response'} on event <strong>${event.title}</strong>
\n<br>
You can review all responses on the <a href="${appURL}/admin/events/${event.id}/responses">admin page</a>
\n<br>
\n<br>
-- The Spoti.es support team.
`;

  return new MailerMessage({
    from: { address, name },
    to: [{ address: owner.email }],
    subject, html, text: stripTags(html),
  });
}