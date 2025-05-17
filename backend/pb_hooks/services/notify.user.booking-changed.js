/// <reference path='../../pb_data/types.d.ts' />

module.exports = {
  notifyBookingChanged,
};

function notifyBookingChanged(eventId, userId) {
  if (!userId || !eventId) return new Error('Invalid params');
  
  let event = $app.findRecordById('events', eventId);
  if (!event) return new Error('No such event');

  let user = $app.findRecordById('users', userId);
  if (!user) return new Error('No such user');
  user.setEmailVisibility(true);

  $app.logger().info(`[notifyBookingChanged] send email to ${user.email()}`)
  $app.newMailClient().send(notifyBookingChangedMail(event.fieldsData(), user.fieldsData()));

  return null
}

function notifyBookingChangedMail(event, user) {
  const { stripTags } = require(`${__hooks}/./util`);

  const meta = { ...$app.settings().meta };
  const subject = `Updated booking on event ${event.title.slice(0, 30)}`;

  const html = $template.loadFiles(
    `${__hooks}/views/emails/layout.html`,
    `${__hooks}/views/emails/user.booking-changed.html`,
  ).render({
      meta,
      subject,
      user,
      event
  })

  return new MailerMessage({
    from: { address: meta.senderAddress, name: meta.senderName },
    to: [{ address: user.email }],
    subject, html, text: stripTags(html),
  });
}