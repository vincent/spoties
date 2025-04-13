/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8hh06own38sfibu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cwzfcsw5",
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
  const collection = dao.findCollectionByNameOrId("8hh06own38sfibu")

  // remove
  collection.schema.removeField("cwzfcsw5")

  return dao.saveCollection(collection)
})
