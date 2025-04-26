/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpwfqp1q968339e")

  collection.viewRule = "@request.auth.id != \"\" && ( @request.auth.id = user.id || @request.auth.teams.id ?= event.team.id )"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpwfqp1q968339e")

  collection.viewRule = "@request.auth.id != \"\" && @request.auth.id = user.id"

  return dao.saveCollection(collection)
})
