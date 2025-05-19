/// <reference path='../../pb_data/types.d.ts' />

module.exports = {
  createTeam
}

/**
 * Save a team.
 * @param {object} $app - Application context
 * @param {object} props - Team props
 */
function createTeam($app, props = {}) {

  const owner = $app.findRecordById('users', props.owner)
  if (!owner) throw new Error('No such user')

  let record = props.id
    ? $app.findRecordById('teams', props.id)
    : new Record($app.findCollectionByNameOrId('teams'))

  record.set('owner', owner.id)

  $app.save(record);
  $app.logger().info(`[team] ${props.id ? 'updated' : 'inserted'} team ${record.id}`)

  owner.set('teams', [record.id])
  $app.save(owner);
  $app.logger().info(`[team] updated owner ${owner.id} with team ${record.id}`)

  return record
}
