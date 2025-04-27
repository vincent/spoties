/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bba43cis9ctxr2")

  collection.listRule = "@request.auth.id != null"
  collection.viewRule = "@request.auth.id != null"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_unique_itmmirru` ON `posts` (`slug`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bba43cis9ctxr2")

  collection.listRule = ""
  collection.viewRule = ""
  collection.indexes = [
    "CREATE UNIQUE INDEX \"idx_unique_itmmirru\" on \"posts\" (\"slug\")"
  ]

  return dao.saveCollection(collection)
})
