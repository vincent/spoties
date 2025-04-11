import type { EventsRecord, EventsResponse, LocationsRecord, LocationsResponse, TimeSlotsRecord } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";
import PocketBase from "pocketbase";

const LOCATIONS = client.collection('locations');
const SLOTS = client.collection('time_slots');
const EVENTS = client.collection('events');

export async function fetchEvent(eventId: string, options: RecordListOptions) {

    let record = {
        title: '',
        locations: [] as any[],
    };

    if (eventId !== 'create') {
        record = {
            ...record,
            ...await EVENTS.getOne<EventsResponse>(eventId, {
                options,
            }),
            locations: await LOCATIONS.getFullList<LocationsResponse>(1000, {
                filter: client.filter('event_id.id = {:eventId}', { eventId }),
            })
        };

        record.locations.forEach(async l => {
            l.slots = await SLOTS.getFullList<LocationsResponse>(1000, {
                filter: client.filter('location_id.id = {:id}', l),
            })
        })

        console.log(record)
    }

    return record
}

// export async function saveEvent(locals: App.Locals, event: FullEventUpdateDto, options: {}) {
//     console.log(`updating Event ${event.id}`)

//     const e1 = await EVENTS.getFirstListItem<EventsResponse>(
//         client.filter('id = {:eventId}', { eventId: event.id }),
//         options
//     )
//     console.log('1 found', e1)

//     let e = await EVENTS.getOne(event.id, options)
//     console.log('2 found', e)

//     console.log('3 found', locals.pb.authStore.record)

//     e = await locals.pb.collection('events').update(event.id, event, options)
//     console.log('3 found', e)
//     e = await EVENTS.update(event.id, event, options)
//     console.log('4 found', e)

//     Object.assign(event, event.id
//         ? await EVENTS.update(event.id, event, options)
//         : await EVENTS.create(event, options))

//     console.log(`updated Event ${event.id}`)

//     for (let i = 0; i < event.locations.length; i++) {
//         const loc = event.locations[i]
//         Object.assign(loc, loc.id
//             ? await LOCATIONS.update(loc.id, loc, options)
//             : await LOCATIONS.create(loc, options))

//         console.log(`updated Location ${loc.id}`)

//         for (let j = 0; j < loc.slots.length; j++) {
//             const slot = loc.slots[j]
//             Object.assign(loc, loc.id
//                 ? await SLOTS.update(slot.id, slot, options)
//                 : await SLOTS.create(slot, options))

//             console.log(`updated Slot ${slot.id}`)
//         }
//     }

//     return event
// }