import type { EventsResponse, TimeSlotsResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";
import type { InputEventObject } from "$lib/pocketbase/types";

const SLOTS = client.collection('time_slots');
const EVENTS = client.collection('events');

export async function fetchEvent(eventId: string, options: RecordListOptions) {

    let record: Partial<InputEventObject> = {
        title: '',
        team: client.authStore.record?.teams[0],
        locations: [] as any[],
        questions: [] as any[],
    };

    if (eventId !== 'create') {

        const event = await EVENTS
            .getFirstListItem<EventsResponse>(
                client.filter('(id={:eventId} || public_access_link={:eventId})', {eventId}),
                {
                    ...options,
                    expand: 'locations_via_event,questions_via_event'
                }
            )

        event.expand = {
            locations_via_event: [],
            questions_via_event: [],
            ...(event.expand || {})
        }
            
        for (let i = 0; i < (event.expand as any)?.locations_via_event?.length; i++) {
            const location = (event.expand as any).locations_via_event[i];
            location.slots = await SLOTS.getFullList<TimeSlotsResponse>(1000, {
                ...options,
                expand: 'bookings_via_slots',
                filter: client.filter('location.id = {:id}', location),
                sort: 'starts_at'
            })
        }

        record = {
            ...record,
            // event,
            id: event.id,
            title: event.title,
            published: event.published,
            sealed: event.sealed,
            created: event.created,
            updated: event.updated,
            description: event.description,
            public_access_link: event.public_access_link,

            questions: (event.expand as any).questions_via_event
                .map(q => ({
                    ...q,
                    properties: q.properties || {}
                }))
                .sort((a, b) => a.rank - b.rank),

            locations: (event.expand as any).locations_via_event.map(location => ({
                id: location.id,
                name: location.name,
                created: location.created,
                updated: location.updated,
                deleted: location.deleted,
                event: location.event,
                description: location.description,
                geo_place: location.geo_place,

                slots: location.slots.map(slot => ({
                    id: slot.id,
                    label: slot.label,
                    limit: slot.limit,
                    available_seats: slot.limit - (slot.expand?.bookings_via_slots || []).length,
                    created: slot.created,
                    updated: slot.updated,
                    deleted: slot.deleted,
                    starts_at: slot.starts_at ? new Date(Date.parse(slot.starts_at)) : null,
                    duration: slot.duration,
                    description: slot.description,
                    location: slot.location,
                })),
            })),
        };
    }

    return record
}
