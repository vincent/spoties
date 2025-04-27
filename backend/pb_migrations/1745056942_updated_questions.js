/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "skfwm4hs",
    "name": "rank",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7qwymq7rbnl9crp")

  // remove
  collection.schema.removeField("skfwm4hs")

  return dao.saveCollection(collection)
})
