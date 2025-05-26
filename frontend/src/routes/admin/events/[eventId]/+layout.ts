import { fetchEventAllAnswers } from "$lib/domain/answers.all";
import { fetchEvent, hasAnyEvent } from "$lib/domain/events";
import { fetchLocations } from "$lib/domain/locations";
import type { LayoutLoad } from "../../../$types";
import { goto } from "$app/navigation";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { eventId } = params;
  const options = { fetch };
  if (!eventId) return goto('/admins/events')

  return Promise
    .all([
      hasAnyEvent(options),
      fetchLocations(eventId, options),
      fetchEvent(eventId, options),
      fetchEventAllAnswers(eventId, options),
    ])
    .then(([ hasAnyEvent, locations, record, {responses} ]) => ({
      eventId,
      locations,
      responses,
      record,
      showHelp: !hasAnyEvent,
    }))
};
