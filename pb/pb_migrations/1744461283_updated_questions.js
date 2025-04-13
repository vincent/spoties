/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  collection.deleteRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
