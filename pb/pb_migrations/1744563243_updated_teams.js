/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fv8he8ucovm402u")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fv8he8ucovm402u")

  collection.createRule = "@request.auth.id != null"

  return dao.saveCollection(collection)
})
