/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool1748787223",
    "name": "published",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool4255432304",
    "name": "sealed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // remove field
  collection.fields.removeById("bool1748787223")

  // remove field
  collection.fields.removeById("bool4255432304")

  return app.save(collection)
})
