/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2541086472",
    "max": 0,
    "min": 0,
    "name": "theme",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // remove field
  collection.fields.removeById("text2541086472")

  return app.save(collection)
})
