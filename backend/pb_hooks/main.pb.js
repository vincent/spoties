// Extending PocketBase with JS - @see https://pocketbase.io/docs/js-overview/

/// <reference path='../pb_data/types.d.ts' />

/**
 * GET /api/config
 * 
 * Returns the application configuration as JSON.
 * - Reads config from config.json and merges with app settings.
 * - Response: 200 OK with the config object.
 * - No authentication required.
 */
routerAdd(
  'GET',
  '/api/config',
  (c) => {
    const { parseJSONFile } = require(`${__hooks}/util`);
    const config = parseJSONFile(`${__hooks}/config.json`);
    const settings = $app.settings();
    config.site.url = settings.meta.appURL;
    config.site.name = settings.meta.appName;
    config.site.copyright = settings.meta.appName;
    c.json(200, config);
  }
);

/**
 * POST /api/events/{eventId}/notify-owner
 * 
 * Notifies the owner of a specific event.
 * - Path parameter: eventId (string) — the ID of the event to notify the owner about.
 * - Request body: { isUpdating?: boolean }
 * - Requires authentication.
 * - If event or auth is missing, returns 403 Forbidden.
 * - On success, triggers notifyEventResponse and returns 200 OK.
 */
routerAdd(
  'POST',
  '/api/events/{eventId}/notify-owner',
  (c) => {
    $app.logger().info(`[notifyEventResponse]`)

    let info = c.requestInfo();
    let auth = info.auth;
    let eventId = c.request.pathValue('eventId')
    let isUpdating = c.requestInfo().body?.isUpdating
    if (!auth || !eventId) return c.forbiddenError('No such event');
    
    let record = $app.findRecordById('events', eventId)
    if (!record) return c.forbiddenError('No such event');

    const { notifyEventResponse } = require(`${__hooks}/./lib/events`);
    notifyEventResponse(eventId, auth.id, isUpdating)

    return c.json(200, { success: true });
  },
  $apis.requireAuth()
);
