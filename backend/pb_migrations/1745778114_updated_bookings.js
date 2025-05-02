/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tpwfqp1q968339e")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool3360088028",
    "name": "confirmed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("tpwfqp1q968339e")

  // remove field
  collection.fields.removeById("bool3360088028")

  return app.save(collection)
})
