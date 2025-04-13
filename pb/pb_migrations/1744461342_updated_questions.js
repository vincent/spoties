/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vpznmoj7",
    "name": "event",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xc6zl7droxdqn54",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  // remove
  collection.schema.removeField("vpznmoj7")

  return dao.saveCollection(collection)
})
