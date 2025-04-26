/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = user.id"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.createRule = "@request.auth.id != null"
  collection.updateRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
})
