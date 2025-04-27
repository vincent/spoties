import { fetchLocations } from "$lib/domain/locations";
import type { LayoutLoad } from "../../../$types";
import { fetchEvent } from "$lib/domain/events";
import { fetchEventAllAnswers } from "$lib/domain/answers.all";
import { goto } from "$app/navigation";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { eventId } = params;
  const options = { fetch };
  if (!eventId) return goto('/admins/events')

  return Promise
    .all([
      fetchLocations(eventId, options),
      fetchEvent(eventId, options),
      fetchEventAllAnswers(eventId, options),
    ])
    .then(([ locations, record, {responses} ]) => ({
      eventId,
      locations,
      responses,
      record,
    }))
};
