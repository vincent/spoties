import type { AnswersResponse, BookingsResponse, UsersResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";

const BOOKINGS = client.collection('bookings');
const ANSWERS = client.collection('answers');
// const USERS_ANSWERS = client.collection('users_event_answers');
const USERS = client.collection('users');

function postUpdateValueFormatter(question: any, row: AnswersResponse): any {
    if (question.answer_type === 'date' && row.value) return new Date(Date.parse(row.value as string))
    return row.value
}

export async function fetchEventAllAnswers(eventId: string, options: RecordListOptions) {

    let data = {
        event_id: eventId,
        responses: [] as any[], // { id: number, answers: Record<string, UserFormAnswer>>, bookings: { id: string, slots: Record<string, boolean> }[]
    };

    data.responses = await USERS
        .getFullList<UsersResponse>({
            ...options,
            filter: client.filter('answers_via_user.event.id = {:eventId}', { eventId }),
            expand: 'answers_via_user.question, bookings_via_user',
        })
        .then(users => users.reduce((acc, u) => acc.concat({
            id: u.id,
            updated: (u.expand as any)?.answers_via_user.reduce((acc, a) => a.updated > acc ? a.updated : acc, ''),
            user: {
                id: u.id,
                name: u.name,
            },
            answers: (u.expand as any)?.answers_via_user.reduce((acc, a: any) => ({
                ...acc,
                [a.question]: a.value,
            }), {}),
            bookings: (u.expand as any)?.bookings_via_user?.[0]?.slots || [],

        }), [] as any[]))

    // record.responses = await ANSWERS
    //     .getFullList<AnswersResponse>(1000, {
    //         ...options,
    //         filter: client.filter('event.id={:eventId}', { eventId }),
    //         expand: 'question'
    //     })
    //     .then(list => list.reduce((acc, a) => ({
    //         ...acc,
    //         [(a.expand as any).question.id]: {
    //             id: a.id,
    //             question: (a.expand as any).question,
    //             value: postUpdateValueFormatter((a.expand as any).question, a)
    //         }
    //     }), {}))

    // record.bookings = await BOOKINGS
    //     .getFullList<BookingsResponse>(1, {
    //         ...options,
    //         filter: client.filter('event.id={:eventId}', { eventId }),
    //     })
    //     .then(bookings => bookings?.length
    //         ? ({
    //             id: bookings[0].id,
    //             slots: bookings[0].slots.reduce((acc, s) => ({ ...acc, [s]: true }), {}),
    //         })
    //         : ({
    //             id: '',
    //             slots: {}
    //         })
    //     )

    return data
}
