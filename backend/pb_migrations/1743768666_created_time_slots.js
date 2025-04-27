/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "8hh06own38sfibu",
    "created": "2025-04-04 12:11:06.248Z",
    "updated": "2025-04-04 12:11:06.248Z",
    "name": "time_slots",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "csaq5mr6",
        "name": "location_id",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8hh06own38sfibu");

  return dao.deleteCollection(collection);
})
