/// <reference path='../../pb_data/types.d.ts' />

/**
 * When a user creates his first event, create its team.
 */
onRecordAfterUpdateSuccess((e) => {
  // e.app
  // e.record

  // send a mail to users who answered this event, to tell them details have changed

  e.next()
}, 'events');

