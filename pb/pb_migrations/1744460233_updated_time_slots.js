/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8hh06own38sfibu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrd9nkps",
    "name": "starts_at",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8hh06own38sfibu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrd9nkps",
    "name": "start_at",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
