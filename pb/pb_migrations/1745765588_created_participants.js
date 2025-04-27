/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "cascadeDelete": false,
        "collectionId": "xc6zl7droxdqn54",
        "hidden": false,
        "id": "relation1001261735",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "event",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "fv8he8ucovm402u",
        "hidden": false,
        "id": "relation3303056927",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "team",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_TlZH",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": false,
        "system": true,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_u32e",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_qPE5",
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
      },
      {
        "hidden": false,
        "id": "_clone_jHsU",
        "name": "emailVisibility",
        "presentable": false,
        "required": false,
        "system": true,
        "type": "bool"
      }
    ],
    "id": "pbc_2437279297",
    "indexes": [],
    "listRule": null,
    "name": "participants",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n  events.id as event,\n  teams.id as team,\n  users.id,\n  users.email,\n  users.name,\n  users.avatar,\n  users.emailVisibility\n  FROM bookings\n INNER JOIN users ON users.id = bookings.user\n INNER JOIN events ON events.id = bookings.event\n INNER JOIN teams ON teams.id = events.team\n",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2437279297");

  return app.delete(collection);
})
