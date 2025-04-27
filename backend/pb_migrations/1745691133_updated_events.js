/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc6zl7droxdqn54")

  collection.updateRule = "@request.auth.id != \"\" && @request.auth.teams ?= team.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc6zl7droxdqn54")

  collection.updateRule = "@request.auth.id != \"\" && team.id = @request.auth.teams"

  return dao.saveCollection(collection)
})
