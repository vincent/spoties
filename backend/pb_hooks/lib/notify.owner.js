/// <reference path='../../pb_data/types.d.ts' />

module.exports = {
  notifyEventResponse,
};

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