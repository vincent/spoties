import { fetchLocations } from "$lib/domain/locations";
import type { LayoutLoad } from "../../../$types";
import { fetchEvent } from "$lib/domain/events";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { eventId } = params;
  const options = { fetch };
  return {
    record: await fetchEvent(eventId as string, options),
    locations: await fetchLocations(options),
  };
};
