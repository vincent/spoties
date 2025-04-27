/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpwfqp1q968339e")

  // remove
  collection.schema.removeField("kncjadrh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dxpt4xtk",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g2ttiuam",
    "name": "slots",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8hh06own38sfibu",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tpwfqp1q968339e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kncjadrh",
    "name": "field",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0fp47xhveeozegh",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("dxpt4xtk")

  // remove
  collection.schema.removeField("g2ttiuam")

  return dao.saveCollection(collection)
})
