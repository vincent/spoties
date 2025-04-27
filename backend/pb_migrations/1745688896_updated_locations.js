/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fp47xhveeozegh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5pte4gdy",
    "name": "deleted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fp47xhveeozegh")

  // remove
  collection.schema.removeField("5pte4gdy")

  return dao.saveCollection(collection)
})
