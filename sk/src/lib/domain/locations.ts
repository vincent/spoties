import type { LocationsRecord, LocationsResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";

const LOCATIONS = client.collection('locations');

export async function fetchLocations(options: RecordListOptions) {

    // const filter = client.filter('org_id = {:eventId}', { eventId }); // fixme
    let locations: LocationsRecord[] = await LOCATIONS.getFullList<LocationsResponse>(1000, options);

    return locations as LocationsResponse[]
}