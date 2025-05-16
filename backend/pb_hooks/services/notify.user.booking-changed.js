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

  const appURL = $app.settings().meta.appURL;
  const name = $app.settings().meta.senderName;
  const address = $app.settings().meta.senderAddress;
  const subject = `Updated booking on event ${event.title.slice(0, 20)}`;
  const html = `Hello ${user.username},
\n<br>
Organizers of event <strong>${event.title}</strong> have changed your booking details.
\n<br>
You can review your updated details on the <a href="${appURL}/event/${event.id}">event form page</a>
\n<br>
\n<br>
-- The Spoti.es support team.
`;

  return new MailerMessage({
    from: { address, name },
    to: [{ address: user.email }],
    subject, html, text: stripTags(html),
  });
}