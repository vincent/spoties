import { fetchLocations } from "$lib/domain/locations";
import type { LayoutLoad } from "../../../$types";
import { fetchEvent } from "$lib/domain/events";
import { fetchEventAllAnswers } from "$lib/domain/answers.all";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { eventId } = params;
  const options = { fetch };
  return Promise
    .all([
      fetchLocations(options),
      fetchEvent(eventId as string, options),
      fetchEventAllAnswers(eventId as string, options),
    ])
    .then(([ locations, record, r ]) => ({
      locations,
      responses: r.responses,
      record,
    }))
};
