import type { EventsRecord, EventsResponse } from "$lib/pocketbase/generated-types";
import type { LayoutLoad } from "../../$types";
import { client } from "$lib/pocketbase";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { eventId } = params;
  // search by both id and slug
  const filter = client.filter("id != {:id}", { id: eventId });
  const collection = client.collection("events");
  const options = { fetch };
  let record: EventsRecord = {
    title: "",
  };
  if (eventId !== 'create') {
    record = await collection.getFirstListItem<EventsResponse>(filter, options);
  }
  return {
    record: record as EventsResponse,
  };
};
