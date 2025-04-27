/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  collection.createRule = "@request.auth.id != null"
  collection.updateRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
