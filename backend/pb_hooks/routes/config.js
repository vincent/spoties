/// <reference path='../../pb_data/types.d.ts' />

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
