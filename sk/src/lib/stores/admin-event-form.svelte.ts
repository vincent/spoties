import type { EventsResponse, LocationsResponse, QuestionsResponse, TimeSlotsResponse } from '$lib/pocketbase/generated-types';
import { client } from "$lib/pocketbase";
import { derived, get, writable } from 'svelte/store';
import { z, type typeToFlattenedError, type ZodIssue } from 'zod'
import { QuestionTypes } from '$lib/domain/questions';
import { locale, translate } from '$lib/i18n';

type AdminEvent = Partial<EventsResponse> & {
    questions: Partial<QuestionsResponse>[]
    locations: (Partial<LocationsResponse> & {
        slots: Partial<TimeSlotsResponse>[]
    })[]
}

let schema = derived(locale, ($l) => z.object({
    title: z
        .string({ message: translate($l, 'errors.required') })
        .trim()
        .min(1, { message: translate($l, 'errors.required') })
        .max(128, { message: translate($l, 'errors.too_long') }),
    description: z.string()
        .trim()
        .min(20, { message: translate($l, 'errors.required') })
        .max(20000),
    questions: z.array(z.object({
        label: z
            .string()
            .trim()
            .min(1, { message: translate($l, 'errors.required') })
            .max(128, { message: translate($l, 'errors.too_long') }),
        answer_type: z
            .nativeEnum(QuestionTypes),
        properties: z
            .object({}),
        required: z
            .boolean(),
    })),
    locations: z.array(z.object({
        // label: z
        //  .string()
        //  .trim()
        //  .min(1)
        //  .max(128, { message: translate($l, 'errors.too_long') }),
        // description: z
        //  .string()
        //  .trim()
        //  .min(1)
        //  .max(20000),
        slots: z
            .array(z.object({
                label: z
                    .string()
                    .trim()
                    .min(1, { message: translate($l, 'errors.required') })
                    .max(128, { message: translate($l, 'errors.too_long') }),
                starts_at: z.coerce.date(),
                description: z
                    .string()
                    .trim()
                    .min(0)
                    .max(20000),
                limit: z
                    .number(),
            }))
    })),
}))

export function createAdminEventStore(initial: AdminEvent, pb = client) {
    const store = writable<AdminEvent>({
        ...initial,
        locations: (initial.locations || []).map(l => ({
            ...l,
            slots: l.slots || []
        }))
    });

    const LOCATIONS = pb.collection('locations');
    const QUESTIONS = pb.collection('questions');
    const SLOTS = pb.collection('time_slots');
    const EVENTS = pb.collection('events');

    return {
        ...store,

        valid: form => {
            const result = get(schema).safeParse(form)
            return { ...result, error: result.error
                ? result.error.flatten(i => i)
                : {} as any
            } as {
                success: boolean,
                error?: typeToFlattenedError<AdminEvent, ZodIssue>
            }
        },

        addEventQuestion: (index: number|undefined = undefined, question: Partial<QuestionsResponse> = {}) => store.update(s => {
            index = index ?? s.questions.length - 1
            const newQuestion = {
                ...question,
                label: '',
                answer_type: '',
                properties: {}
            }
            const questions = s.questions.slice()
            questions.splice(index, 0, newQuestion)
            return ({
                ...s,
                questions,
            })
        }),

        removeEventQuestion: (index: number) => store.update(s => {
            const questions = s.questions.slice()
            questions.splice(index, 1)
            return ({
                ...s,
                questions: s.questions.map((q, i) => i !== index ? q : ({ ...q, deleted: true })),
            })
        }),

        addLocation: (location: Partial<LocationsResponse> = {}) => store.update(s => ({
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
                    starts_at: '',
                    duration: 4 * 60,
                    limit: 0,
                })
            }))
        })),
    
        removeLocationTimeSlot: (locationId: string, slotIndex: number) =>  store.update(s => ({
            ...s,
            locations: (s.locations || []).map((l, i) => l.id !== locationId ? l : ({
                ...l, slots: (l.slots || []).filter((s, i) => i !== slotIndex)
            }))
        })),

        /////////////////////////

        reset: () => store.set({ ...initial }),

        updateEvent: async (props: AdminEvent) => {

            console.log(store)
            debugger;

            Object.assign(props, props.id
                ? await EVENTS.update(props.id, props)
                : await EVENTS.create(props))

            for (let i = 0; i < props.questions.length; i++) {
                const q = props.questions[i]
                Object.assign(q, {
                    ...q,
                    event: props.id,
                    entity: 'event',
                    entity_id: props.id,
                    rank: i,
                })
                Object.assign(props.questions[i], q.id
                    ? await QUESTIONS.update(q.id, q)
                    : await QUESTIONS.create(q))
            }

            for (let i = 0; i < props.locations.length; i++) {
                const loc = props.locations[i]
                Object.assign(loc, {
                    ...loc,
                    event: props.id
                })
                Object.assign(props.locations[i], loc.id
                    ? await LOCATIONS.update(loc.id, loc)
                    : await LOCATIONS.create(loc))

                // props.locations[i] = loc as any
                
                for (let j = 0; j < loc.slots.length; j++) {
                    const slot = {
                        ...loc.slots[j],
                        location: loc.id,
                    }
                    Object.assign(loc.slots[j], slot.id
                        ? await SLOTS.update(slot.id as string, slot)
                        : await SLOTS.create(slot))

                    // loc.slots[j].starts_at = slot.starts_at ? new Date(Date.parse(slot.starts_at)) : undefined,                        
                    // props.locations[i].slots[j] = slot as any
                }

            }

            // // mark old slots as deleted
            // const newSlotsIds = props.locations.flatMap(l => l.slots.map(s => s.id))
            // const oldSlots = await SLOTS.getFullList({
            //     filter: client.filter(`event = {:eventId}`, { eventId: props.id })
            // })
            // debugger;
            // for (let i = 0; i < oldSlots.length; i++) {
            //     if (newSlotsIds.includes(oldSlots[i].id)) continue;
            //     await SLOTS.update(oldSlots[i].id, { deleted: true })
            // }
            
            store.update(s => ({ ...s, ...props }))
        }
    };
}

export const AdminEventStore = createAdminEventStore({
    locations: [],
    questions: [],
})