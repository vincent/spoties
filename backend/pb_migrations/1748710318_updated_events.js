/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // update collection data
  unmarshal({
    "viewRule": "(@request.auth.id != \"\" && @request.auth.teams.id ?= team.id) || (published = true)"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("xc6zl7droxdqn54")

  // update collection data
  unmarshal({
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
