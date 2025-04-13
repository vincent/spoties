/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.listRule = "@request.auth.id != null"
  collection.viewRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
