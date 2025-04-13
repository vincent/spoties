import { goto } from "$app/navigation";
import { client } from "$lib/pocketbase";
import type { AnswersResponse, BookingsResponse } from "$lib/pocketbase/generated-types";
import { writable } from 'svelte/store';

type UserFormAnswer = {
    id?: string
    question: {
        id: string
        answer_type: string
    }
    value: any
}

type UserEvent = {
    questions_answers: Record<string, UserFormAnswer>
    bookings: { id: string, slots: Record<string, boolean> }
    event_id: string
}

export function createUserEventStore(initial: UserEvent, pb = client) {
    const store = writable<UserEvent>();

    const BOOKINGS = pb.collection('bookings');
    const ANSWERS = pb.collection('answers');
    const user = client.authStore.record

    function postUpdateValueFormatter(a: UserFormAnswer, row: AnswersResponse): any {
        if (a.question.answer_type === 'date' && row.value) return new Date(Date.parse(row.value as string))
        return row.value
    }

    return {
        ...store,

        /////////////////////////

        reset: () => store.set({ ...initial }),

        updateUserAnswer: async (props: UserEvent) => {

            console.log(store)
            debugger;

            const questions_answers = Object.values(props.questions_answers)
            for (let i = 0; i < questions_answers.length; i++) {
                const a = questions_answers[i]
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
                slots: Object.keys(props.bookings.slots).filter(sid => !!props.bookings.slots[sid])
            }
            const row = props.bookings.id
                ? await BOOKINGS.update<BookingsResponse>(props.bookings.id, bookings)
                : await BOOKINGS.create<BookingsResponse>(bookings)

            Object.assign(props.bookings, {
                ...props.bookings,
                id: row.id,
            })

            store.update(s => ({ ...s, ...props }))

            goto(`/event/${props.event_id}/done`)
        }
    };
}

export const userEventStore = createUserEventStore({
    questions_answers: {},
    bookings: { id: '', slots: {} },
    event_id: '',
})