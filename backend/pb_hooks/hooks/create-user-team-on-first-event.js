/// <reference path='../../pb_data/types.d.ts' />

/**
 * When a user creates his first event, create its team.
 */
onRecordCreateRequest(e => {
  if (e.hasSuperuserAuth() || e.auth.fieldsData().teams?.length) return e.next();

  // create team and attach it to user
  $app.db().insert('teams', { owner: e.auth.id }).execute()
  const team = $app.findFirstRecordByData('teams', 'owner', e.auth.id)

  // update the owner record
  $app.logger().info(`[createUserTeamOnFirstEvent] update user ${e.auth.id} with team ${team.id}`)
  $app.db().update('users', { 'teams': team.id }, $dbx.exp('id = {:id}', e.auth)).execute()

  // attach created team to to-be-inserted event
  e.record.set('team', team.id)

  e.next()
}, 'events');

