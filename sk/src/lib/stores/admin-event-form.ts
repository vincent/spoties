import type { EventsResponse, LocationsResponse, TimeSlotsResponse } from '$lib/pocketbase/generated-types';
import { client } from "$lib/pocketbase";
import { writable } from 'svelte/store';

type AdminEvent = Partial<EventsResponse> & {
    locations: (Partial<LocationsResponse> & {
        slots: Partial<TimeSlotsResponse>[]
    })[]
}

export function createAdminEventStore(initial: AdminEvent, pb = client) {
    const store = writable<AdminEvent>({
        ...initial,
        locations: (initial.locations || []).map(l => ({
            ...l,
            slots: l.slots || []
        }))
    });

    debugger;

    const LOCATIONS = pb.collection('locations');
    const SLOTS = pb.collection('time_slots');
    const EVENTS = pb.collection('events');

    return {
        ...store,

        reset: () => store.set({ ...initial }),

        updateEvent: async (props: AdminEvent) => {

            console.log(store)
            debugger;

            Object.assign(props, props.id
                ? await EVENTS.update(props.id, props)
                : await EVENTS.create(props))

            for (let i = 0; i < props.locations.length; i++) {
                const loc = props.locations[i]
                Object.assign(loc, {
                    ...loc,
                    event_id: props.id
                })
                Object.assign(loc, loc.id
                    ? await LOCATIONS.update(loc.id, loc)
                    : await LOCATIONS.create(loc))

                // props.locations[i] = loc as any
                
                for (let j = 0; j < loc.slots.length; j++) {
                    const slot = {
                        ...loc.slots[j],
                        location_id: loc.id,
                    }
                    Object.assign(slot, slot.id
                        ? await SLOTS.update(slot.id as string, slot)
                        : await SLOTS.create(slot))
                    
                    // props.locations[i].slots[j] = slot as any
                }
            }
                    
            store.update(s => ({ ...s, ...props }))
        },

        addLocation: (location: Partial<LocationsResponse>) => store.update(s => ({
            ...s,
            locations: (s.locations || []).concat({
                ...location,
                slots: [],
            })
        })),

        removeLocation: (location: Partial<LocationsResponse>) => store.update(s => ({
            ...s,
            locations: (s.locations || []).filter(l => l !== location && l.id !== location.id)
        })),

        addLocationTimeSlot: (locationId: string) =>  store.update(s => ({
            ...s,
            locations: (s.locations || []).map((l, i) => l.id !== locationId ? l : ({
                ...l, slots: (l.slots || [])
                .concat({
                    label: '',
                    description: '',
                    start_at: '',
                    duration: 4 * 60,
                    limit: 0,
                })
            }))
        }))
    
    };
}

export const AdminEventStore = createAdminEventStore({
    locations: []
})