import type {
  AnswersResponse,
  BookingsResponse,
  ParticipantsResponse,
} from "$lib/pocketbase/generated-types";
import type { UserBookingResponse } from "$lib/pocketbase/types";
import type { RecordListOptions } from "pocketbase";
import { client } from "$lib/pocketbase";
import { isTempEvent } from "$lib/utils/utils";

const ANSWERS = client.collection("answers");
const BOOKINGS = client.collection("bookings");
const PARTICIPANTS = client.collection("participants");

export async function fetchEventAllAnswers(
  eventId: string,
  options: RecordListOptions
) {
  let data = {
    event_id: eventId,
    responses: [] as UserBookingResponse[],
  };

  if (isTempEvent(eventId)) return data;

  data.responses = await BOOKINGS.getFullList<BookingsResponse>({
    ...options,
    filter: client.filter("event.id = {:eventId}", { eventId }),
  }).then(async (bookings) => {
    const users = await PARTICIPANTS.getFullList<ParticipantsResponse>({
      ...options,
      filter: client.filter("event = {:eventId}", { eventId }),
    }).then((ps) =>
      ps.reduce(
        (acc, { id, name, email, avatar, verified }) => ({
          ...acc,
          [id]: { id, name, email, avatar, verified },
        }),
        {}
      )
    );

    const answersByUser = await ANSWERS.getFullList<AnswersResponse>({
      ...options,
      filter: client.filter("event.id = {:eventId}", { eventId }),
      expand: "question",
    }).then((allAnswers) =>
      allAnswers.reduce((acc, a) => {
        const qid = a.question.toString();
        const uid = a.user.toString();
        acc[uid] ||= { updated: "" };
        return {
          ...acc,
          [uid]: {
            ...acc[uid],
            [qid]: a.value,
            updated:
              a.updated < acc[uid].updated ? acc[uid].updated : a.updated,
          },
        };
      }, {})
    );

    return bookings.reduce((acc, b) => {
      const user = users[b.user.toString()];
      if (!user || !answersByUser[user.id]) return acc;

      return acc.concat({
        updated: answersByUser[user.id].updated,
        answers: answersByUser[user.id],
        bookings: b.slots || [],
        confirmed: b.confirmed,
        id: b.id,
        user,
      });
    }, [] as UserBookingResponse[]);
  });

  return data;
}
