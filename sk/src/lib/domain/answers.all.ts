import type { UsersResponse } from "$lib/pocketbase/generated-types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";

const USERS = client.collection('users');

export async function fetchEventAllAnswers(eventId: string, options: RecordListOptions) {

    let data = {
        event_id: eventId,
        responses: [] as any[],
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

    return data
}
