/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2437279297")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != '' && @request.body.event != ''",
    "viewRule": "@request.auth.id != '' && @request.body.event != ''"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_dqth")

  // remove field
  collection.fields.removeById("_clone_jnWo")

  // remove field
  collection.fields.removeById("_clone_mDhU")

  // remove field
  collection.fields.removeById("_clone_ySa1")

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_MVOy",
    "name": "email",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": true,
    "type": "email"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_l4TF",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "_clone_SVsE",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "avatar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "_clone_F9oU",
    "name": "emailVisibility",
    "presentable": false,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2437279297")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != '' && @request.body.event.id != ''",
    "viewRule": "@request.auth.id != '' && @request.body.event.id != ''"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_dqth",
    "name": "email",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": true,
    "type": "email"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_jnWo",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "_clone_mDhU",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "avatar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "_clone_ySa1",
    "name": "emailVisibility",
    "presentable": false,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("_clone_MVOy")

  // remove field
  collection.fields.removeById("_clone_l4TF")

  // remove field
  collection.fields.removeById("_clone_SVsE")

  // remove field
  collection.fields.removeById("_clone_F9oU")

  return app.save(collection)
})
