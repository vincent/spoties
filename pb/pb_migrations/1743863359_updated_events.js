/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc6zl7droxdqn54")

  collection.createRule = "@request.auth.id != null"
  collection.updateRule = "@request.auth.id != null"
  collection.deleteRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc6zl7droxdqn54")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
