/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.viewRule = "@request.auth.id != \"\" && ( @request.auth.id = user.id || @request.auth.teams.id ?= event.team.id )"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.viewRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
})
