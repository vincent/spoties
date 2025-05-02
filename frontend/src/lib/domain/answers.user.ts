import type { AnswersResponse, BookingsResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";

const BOOKINGS = client.collection('bookings');
const ANSWERS = client.collection('answers');

function postUpdateValueFormatter(question: any, row: AnswersResponse): any {
    if (question.answer_type === 'date' && row.value) return new Date(Date.parse(row.value as string))
    return row.value
}

export async function fetchEventUserAnswers(eventId: string, userId: string, options: RecordListOptions) {

    let record = {
        event_id: eventId,
        questions_answers: {}, // Record<string, UserFormAnswer>
        bookings: { id: '', updated: new Date(), slots: {} }, // { id: string, slots: Record<string, boolean> }
    };

    record.questions_answers = await ANSWERS
        .getFullList<AnswersResponse>(1000, {
            ...options,
            filter: client.filter('user.id={:userId} && event.id={:eventId}', { userId, eventId }),
            expand: 'question'
        })
        .then(list => list.reduce((acc, a) => ({
            ...acc,
            [(a.expand as any).question.id]: {
                id: a.id,
                question: (a.expand as any).question,
                value: postUpdateValueFormatter((a.expand as any).question, a)
            }
        }), {}))

    record.bookings = await BOOKINGS
        .getFullList<BookingsResponse>(1, {
            ...options,
            filter: client.filter('user.id={:userId} && event.id={:eventId}', { userId, eventId }),
        })
        .then(bookings => bookings?.length
            ? ({
                id: bookings[0].id,
                slots: bookings[0].slots.reduce((acc, s) => ({ ...acc, [s]: true }), {}),
                updated: new Date(Date.parse(bookings[0].updated)),
            })
            : ({
                id: '',
                slots: {},
                updated: new Date()
            })
        )

    return record
}
