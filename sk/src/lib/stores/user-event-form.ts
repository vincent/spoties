import { client } from "$lib/pocketbase";
import type { AnswersResponse } from "$lib/pocketbase/generated-types";
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
    slots_answers: Record<string, boolean>
    event_id: string
}

export function createUserEventStore(initial: UserEvent, pb = client) {
    const store = writable<UserEvent>();

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

            store.update(s => ({ ...s, ...props }))
        }
    };
}

export const userEventStore = createUserEventStore({
    questions_answers: {},
    slots_answers: {},
    event_id: '',
})