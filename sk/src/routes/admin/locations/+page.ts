import { client, watch } from "$lib/pocketbase";
import type { LocationsResponse } from "$lib/pocketbase/generated-types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const filter = client.filter("user != ''", {});
  const expand = "user";
  const queryParams = {
    // filter,
    expand,
    fetch,
  };
  const locations = await watch<LocationsResponse<any>>("locations", queryParams);
  const { metadata } = await parent();
  // you could set the title/headline either here or in +page.svelte
  metadata.title = "Locations";
  return {
    metadata,
    locations,
  };
};
