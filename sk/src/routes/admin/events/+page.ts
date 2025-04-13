import type { EventsResponse } from "$lib/pocketbase/generated-types";
import { client, watch } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const filter = client.filter("user != ''", {});
  const expand = "user";
  const queryParams = {
    // filter,
    expand,
    fetch,
  };
  const events = await watch<EventsResponse<any>>("events", queryParams);
  const { metadata } = await parent();
  // you could set the title/headline either here or in +page.svelte
  metadata.title = "Events";
  return {
    metadata,
    events,
  };
};
