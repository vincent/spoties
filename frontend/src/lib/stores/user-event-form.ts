import type { AnswersResponse, BookingsResponse, EventsResponse, LocationsResponse, QuestionsResponse, TimeSlotsResponse } from "$lib/pocketbase/generated-types";
import { z, type typeToFlattenedError, type ZodIssue } from "zod";
import type { QuestionType } from "$lib/domain/questions";
import { locale, translate } from "$lib/i18n";
import { get, writable } from 'svelte/store';
import { client } from "$lib/pocketbase";
import { goto } from "$app/navigation";

type Question = {
    id: string
    properties: any
    required: boolean
    answer_type: QuestionType
}

type UserFormAnswer = {
    id?: string
    question: Question
    value: any
}

type UserEvent = {
    questions_answers: Record<string, UserFormAnswer>
    bookings: { id: string, updated: Date, slots: Record<string, boolean> }
    event_id: string
}

type InputEventObject = EventsResponse & {
    questions: QuestionsResponse[]
    locations: (LocationsResponse & { slots: TimeSlotsResponse[] })[]
}

export function createUserEventStore(initial: UserEvent, pb = client) {
    const store = writable<UserEvent>();

    const BOOKINGS = pb.collection('bookings');
    const ANSWERS = pb.collection('answers');
    const user = client.authStore.record

    let schema = z.object({})

    function questionValidator(q: Question) {
        if (!q.required) return z.any()
        if (q.answer_type === 'checkboxes') return z.object({ value: z.string().array() })
        return z.object({
            // value: z.union([ z.number(), z.string() ], { message: translate(get(locale), 'errors.required') })
            value: z.coerce.string()
                .min(1)
                .refine(val => (val !== 'null') ? val : '', { message: translate(get(locale), 'errors.required') })
        })
    }

    function updateValidation(props: UserEvent) {
        schema = z.object({
            questions_answers: z.object(
                Object.keys(props.questions_answers)
                    .reduce((acc, qid) => ({
                        ...acc,
                        [qid]: questionValidator(props.questions_answers[qid].question)
                    }), {})
            ),
            bookings: z.object({
                slots: z.object({})
            }),
        })
    }

    return {
        ...store,

        valid: form => {
            const result = schema.safeParse(form)
            const flatten = { ...result, error: result.error
                ? result.error.flatten(i => i)
                : {} as any
            } as {
                success: boolean,
                error?: typeToFlattenedError<UserEvent, ZodIssue>
            }

            return flatten
        },

        /////////////////////////

        reset: () => store.set({ ...initial }),

        init: (record: InputEventObject, userData: UserEvent) => {
            const initial = {
                event_id: record.id,
                questions_answers: {
                    ...record.questions.reduce((acc, question) => ({
                        ...acc,
                        [question.id]: {
                            question,
                            value: question.answer_type === 'select_many' ? [] : null,
                        }
                    }), {}),
                    ...(userData.questions_answers || {})
                },
                bookings: {
                    ...record.locations.map(l => l.slots).flat().reduce((acc, s) => ({
                        ...acc,
                        [s.id]: null
                    }), {}),
                    ...(userData.bookings || {})
                },
            }
            store.set(initial);
            updateValidation(initial);
        },

        updateUserAnswer: async (props: UserEvent) => {

            const isUpdating = !!props.bookings.id
            let alertOwner = !isUpdating

            if (isUpdating) {
                const dateUpdated = +(new Date(props.bookings.updated))
                const twelveHoursAgo = +(new Date()) - (12 * 60 * 60 * 1000)
                alertOwner = dateUpdated < twelveHoursAgo
            }

            const questions_answers = Object.values(props.questions_answers)
            for (let i = 0; i < questions_answers.length; i++) {
                const a = questions_answers[i];
                Object.assign(a, {
                    ...a,
                    user: user?.id,
                    event: props.event_id,
                    question: a.question.id,
                })

                const row = a.id
                    ? await ANSWERS.update<AnswersResponse>(a.id, a)
                    : await ANSWERS.create<AnswersResponse>(a)

                Object.assign(a, {
                    ...a,
                    id: row.id,
                })
            }

            const bookings = {
                id: props.bookings.id,
                user: user?.id,
                event: props.event_id,
                slots: Object.keys(props.bookings.slots).filter(sid => !!props.bookings.slots[sid]),
            }
            const row = props.bookings.id
                ? await BOOKINGS.update<BookingsResponse>(props.bookings.id, bookings)
                : await BOOKINGS.create<BookingsResponse>(bookings)

            Object.assign(props.bookings, {
                ...props.bookings,
                id: row.id,
            })

            store.update(s => ({ ...s, ...props }))

            if (alertOwner) {
                await client.send(`/api/events/${props.event_id}/notify-owner`, { method: 'post', body: { isUpdating } });
            }

            goto(`/event/${props.event_id}/done`)
        }
    };
}

export const userEventStore = createUserEventStore({
    questions_answers: {},
    bookings: { id: '', updated: new Date, slots: {} },
    event_id: '',
})