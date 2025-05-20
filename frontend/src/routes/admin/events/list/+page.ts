import type { EventsResponse } from "$lib/pocketbase/generated-types";
import { client, watch } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const team = client.authStore.record?.teams?.[0] || '-';
  const filter = client.filter("team = {:team}", { team });
  const expand = "bookings_via_event,locations_via_event";
  const queryParams = {
    filter,
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
