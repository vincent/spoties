/// <reference path='../../pb_data/types.d.ts' />

module.exports = {
  acknowledgeUserEventResponse,
};

function acknowledgeUserEventResponse(eventId, userId, bookingId) {
  if (!userId || !eventId || !bookingId) return new Error('Invalid params');
  
  const event = $app.findRecordById('events', eventId);
  if (!event) return new Error('No such event');
  $app.expandRecord(event, ['team'], null);

  const user = $app.findRecordById('users', userId);
  if (!user) return new Error('No such user');
  user.setEmailVisibility(true);

  if (!event) return new Error('No such event');
  const team = event.expand().team;

  const owner = $app.findRecordById('users', team.fieldsData().owner);
  if (!owner) return new Error('No such event');

  owner.setEmailVisibility(true);
  if (!owner) return new Error('No such event');

  const booking = $app.findRecordById('bookings', bookingId)
  if (!booking) return new Error('No such booking');
  if (!booking.fieldsData().slots?.length) return null;

  const slots = $app.findRecordsByIds('time_slots', booking.fieldsData().slots)
  if (!slots?.length) return new Error('No such slots');

  const dates = slots.map(s => s.fieldsData().starts_at).filter(Boolean)
  if (!dates?.length) return null;

  $app.logger().info(`[acknowledgeUserEventResponse] send email to ${user.email()}`)

  let reader = null;
  try {
    const file = $filesystem.fileFromBytes(eventCalendarInvite(event, user, owner, slots), 'invite.ics')
    reader = file.reader.open()
    const mail = acknowledgeUserEventResponseMail(event.fieldsData(), user.fieldsData())
    mail.attachments = { [file.originalName]: reader }
    $app.newMailClient().send(mail);
  }
  finally {
    reader?.close()
  }
  return null
}

function acknowledgeUserEventResponseMail(event, user) {
  const { stripTags } = require(`${__hooks}/./util`);

  const meta = { ...$app.settings().meta };
  const subject = `Received your booking details for event ${event.title.slice(0, 30)}`;

  const html = $template.loadFiles(
    `${__hooks}/views/emails/layout.html`,
    `${__hooks}/views/emails/user.response-acknowledged.html`,
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
  })
}

function eventCalendarInvite(event, user, owner, slots) {
  const { stripTags } = require(`${__hooks}/./util`);

  const venues = slots
    .filter(s => !!s.fieldsData().starts_at)
    .map(slot => {
      const unix = Date.parse(slot.fieldsData().starts_at)
      const dateStart = formatDateToCompactISO(new Date(unix))
      const dateEnd = formatDateToCompactISO(new Date(unix + (60 * 60 * 4)))
      return ({ slot: slot.fieldsData(), unix, dateStart, dateEnd })
  })

  return `
BEGIN:VCALENDAR
PRODID:-//Spoti.es//Scheduler//EN
VERSION:2.0
METHOD:PUBLISH ${venues.map(v => `
BEGIN:VEVENT
UID:${$security.pseudorandomString(32)}
SEQUENCE:${Math.round(v.unix / 1000)}
STATUS:CONFIRMED
ATTENDEE;CUTYPE=INDIVIDUAL;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT;RSVP=true:mailto:${user.email()}
DTSTART:${v.dateStart}
DTEND:${v.dateEnd}
SUMMARY:${event.fieldsData().title} (${stripTags(v.slot.label)})
DESCRIPTION:By using the Spoti.es form, you confirmed your presence to this event.
END:VEVENT
`).join("\n")}
END:VCALENDAR`
}

function formatDateToCompactISO(date) {
  // Ensure we're working with a Date object
  if (!(date instanceof Date)) throw new Error('invalid date argument')
  
  // Get UTC components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  // Format as YYYYMMDDTHHMMSSZ
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}