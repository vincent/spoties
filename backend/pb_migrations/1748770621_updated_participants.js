/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2437279297")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n  events.id as event,\n  teams.id as team,\n  users.id,\n  users.email,\n  users.name,\n  users.avatar,\n  users.verified,\n  users.emailVisibility\n  FROM bookings\n INNER JOIN users ON users.id = bookings.user\n INNER JOIN events ON events.id = bookings.event\n INNER JOIN teams ON teams.id = events.team\n"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_poIK")

  // remove field
  collection.fields.removeById("_clone_0sHB")

  // remove field
  collection.fields.removeById("_clone_oB4o")

  // remove field
  collection.fields.removeById("_clone_3nfv")

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_Zq8r",
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
    "id": "_clone_1D7x",
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
    "id": "_clone_2Ey4",
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
    "id": "_clone_yw0G",
    "name": "verified",
    "presentable": false,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_Q11q",
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
    "viewQuery": "SELECT \n  events.id as event,\n  teams.id as team,\n  users.id,\n  users.email,\n  users.name,\n  users.avatar,\n  users.emailVisibility\n  FROM bookings\n INNER JOIN users ON users.id = bookings.user\n INNER JOIN events ON events.id = bookings.event\n INNER JOIN teams ON teams.id = events.team\n"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_poIK",
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
    "id": "_clone_0sHB",
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
    "id": "_clone_oB4o",
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
    "id": "_clone_3nfv",
    "name": "emailVisibility",
    "presentable": false,
    "required": false,
    "system": true,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("_clone_Zq8r")

  // remove field
  collection.fields.removeById("_clone_1D7x")

  // remove field
  collection.fields.removeById("_clone_2Ey4")

  // remove field
  collection.fields.removeById("_clone_yw0G")

  // remove field
  collection.fields.removeById("_clone_Q11q")

  return app.save(collection)
})
