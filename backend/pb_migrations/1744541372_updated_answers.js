/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o4j9kubn",
    "name": "event",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("940q6gqfgo9yhuh")

  // remove
  collection.schema.removeField("o4j9kubn")

  return dao.saveCollection(collection)
})
