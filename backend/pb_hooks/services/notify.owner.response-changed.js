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
  if (!owner) return new Error('No such event');

  owner.setEmailVisibility(true);
  if (!owner) return new Error('No such event');

  $app.logger().info(`[notifyEventResponse] send email to ${owner.fieldsData().email}`)
  $app.newMailClient().send(eventResponseMail(event.fieldsData(), owner.fieldsData(), user.fieldsData(), isUpdating));

  return null
}

function eventResponseMail(event, owner, responder, isUpdating = false) {
  const { stripTags } = require(`${__hooks}/./util`);

  const meta = { ...$app.settings().meta };
  const subject = `${!isUpdating ? 'New response' : 'Updated response'} on event ${event.title.slice(0, 30)}`;

  const html = $template.loadFiles(
    `${__hooks}/views/emails/layout.html`,
    `${__hooks}/views/emails/owner.response-changed.html`,
  ).render({
      meta,
      subject,
      user: responder,
      action: `has ${!isUpdating ? 'posted a new response' : 'updated their response'}`,
      isUpdating,
      owner,
      event
  })

  return new MailerMessage({
    from: { address: meta.senderAddress, name: meta.senderName },
    to: [{ address: owner.email }],
    subject, html, text: stripTags(html),
  });
}