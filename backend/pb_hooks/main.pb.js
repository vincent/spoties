// Extending PocketBase with JS - @see https://pocketbase.io/docs/js-overview/

/// <reference path='../pb_data/types.d.ts' />

require(`${__hooks}/./hooks/users`);

require(`${__hooks}/./routes/config`);
require(`${__hooks}/./routes/notify`);
require(`${__hooks}/./routes/form.user.event`);
require(`${__hooks}/./routes/form.admin.event`);

