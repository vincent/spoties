import type { LocationsRecord, LocationsResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";
import { isTempEvent } from "$lib/utils/utils";

const LOCATIONS = client.collection('locations');

export async function fetchLocations(eventId: string, options: RecordListOptions) {

    if (isTempEvent(eventId)) return [];

    let locations: LocationsRecord[] = await LOCATIONS.getFullList<LocationsResponse>(1000, {
        ...options,
        filter: client.filter('event = {:eventId}', { eventId })
    });

    return locations as LocationsResponse[]
}