import type {
  InputEventObject,
  Question,
  UserEvent,
} from "$lib/pocketbase/types";
import { z, type typeToFlattenedError, type ZodIssue } from "zod";
import { locale, translate } from "$lib/i18n";
import { get, writable } from "svelte/store";
import { client } from "$lib/pocketbase";
import { goto } from "$app/navigation";

export function createUserEventStore(initial: UserEvent, pb = client) {
  const store = writable<UserEvent>();

  let schema = z.object({});

  function questionValidator(q: Question) {
    if (!q.required) return z.any();
    if (q.answer_type === "checkboxes")
      return z.object({ value: z.string().array() });
    return z.object({
      // value: z.union([ z.number(), z.string() ], { message: translate(get(locale), 'errors.required') })
      value: z.coerce
        .string()
        .min(1)
        .refine((val) => (val !== "null" ? val : ""), {
          message: translate(get(locale), "errors.required"),
        }),
    });
  }

  function updateValidation(props: UserEvent) {
    schema = z.object({
      questions_answers: z.object(
        Object.keys(props.questions_answers).reduce(
          (acc, qid) => ({
            ...acc,
            [qid]: questionValidator(props.questions_answers[qid].question),
          }),
          {}
        )
      ),
      bookings: z.object({
        slots: z.object({}),
      }),
    });
  }

  return {
    ...store,

    valid: (form) => {
      const result = schema.safeParse(form);
      const flatten = {
        ...result,
        error: result.error ? result.error.flatten((i) => i) : ({} as any),
      } as {
        success: boolean;
        error?: typeToFlattenedError<UserEvent, ZodIssue>;
      };

      return flatten;
    },

    /////////////////////////

    reset: () => store.set({ ...initial }),

    init: (record: InputEventObject, userData: UserEvent) => {
      const initial = {
        loading: true,
        event_id: record.id,
        questions_answers: {
          ...record.questions.reduce(
            (acc, question) => ({
              ...acc,
              [question.id]: {
                question,
                value: question.answer_type === "select_many" ? [] : null,
              },
            }),
            {}
          ),
          ...(userData.questions_answers || {}),
        },
        bookings: {
          ...record.locations
            .map((l) => l.slots)
            .flat()
            .reduce(
              (acc, s) => ({
                ...acc,
                [s.id]: null,
              }),
              {}
            ),
          ...(userData.bookings || {}),
        },
      };
      store.set(initial);
      updateValidation(initial);
      store.set({ ...initial, loading: false });
    },

    updateUserAnswer: async (props: UserEvent) =>
      Promise.resolve()
        .then((_) => store.update((s) => ({ ...s, loading: true })))
        .then((_) =>
          client.send(`/api/events/${props.event_id}/answer`, {
            method: "post",
            body: props,
          })
        )
        .then((updated) =>
          store.update((s) => ({ ...s, ...props, ...updated }))
        )
        .finally(() => {
          store.update((s) => ({ ...s, loading: false }));
          goto(`/event/${props.event_id}/done`);
        }),
  };
}

export const userEventStore = createUserEventStore({
  loading: false,
  questions_answers: {},
  bookings: { id: "", updated: new Date(), slots: {} },
  event_id: "",
});
