import type {
  LocationsResponse,
  QuestionsResponse,
} from "$lib/pocketbase/generated-types";
import { QuestionTypes, type AdminEvent } from "$lib/pocketbase/types";
import { z, type typeToFlattenedError, type ZodIssue } from "zod";
import { derived, get, writable } from "svelte/store";
import { locale, translate } from "$lib/i18n";
import { client } from "$lib/pocketbase";
import { goto } from "$app/navigation";

let schema = derived(locale, ($l) =>
  z.object({
    title: z
      .string({ message: translate($l, "errors.required") })
      .trim()
      .min(1, { message: translate($l, "errors.required") })
      .max(128, { message: translate($l, "errors.too_long") }),
    description: z
      .string()
      .trim()
      // .min(20, { message: translate($l, 'errors.required') })
      .max(20000),
    questions: z.array(
      z.object({
        label: z
          .string()
          .trim()
          .min(1, { message: translate($l, "errors.required") })
          .max(128, { message: translate($l, "errors.too_long") }),
        answer_type: z.nativeEnum(QuestionTypes),
        properties: z.object({}),
        required: z.boolean(),
      })
    ),
    locations: z.array(
      z.union([
        z.object({ deleted: z.literal(true) }),
        z.object({
          name: z
            .string()
            .trim()
            .min(1)
            .max(128, { message: translate($l, "errors.too_long") }),
          // description: z
          //  .string()
          //  .trim()
          //  .min(1)
          //  .max(20000),
          slots: z.array(
            z.union([
              z.object({ deleted: z.literal(true) }),
              z.object({
                label: z
                  .string()
                  .trim()
                  .min(1, { message: translate($l, "errors.required") })
                  .max(128, { message: translate($l, "errors.too_long") }),
                starts_at: z.coerce.date(),
                description: z.string().trim().min(0).max(20000),
                limit: z.number(),
              }),
            ])
          ),
        }),
      ])
    ),
  })
);

export const dirty = writable(false);
export function createAdminEventStore(initial: AdminEvent, pb = client) {
  const store = writable<AdminEvent>({
    ...initial,
    locations: (initial.locations || []).map((l) => ({
      ...l,
      slots: l.slots || [],
    })),
  });

  store.subscribe((_) => dirty.set(true));

  const LOCAL_STORAGE_TMP_KEY = "stored-event";

  return {
    ...store,

    questions: {
      add(
        index: number | undefined = undefined,
        question: Partial<QuestionsResponse> = {}
      ) {
        store.update((s) => {
          index = index ?? s.questions.length;
          const newQuestion = {
            ...question,
            label: "",
            answer_type: "",
            required: true,
            properties: {},
          };
          const questions = s.questions.slice();
          questions.splice(index, 0, newQuestion as any);
          return {
            ...s,
            questions,
          };
        });
      },
      remove(index: number) {
        store.update((s) => {
          const questions = s.questions.slice();
          questions.splice(index, 1);
          return {
            ...s,
            questions: s.questions
              .map((q, i) =>
                i !== index ? q : q.id ? { ...q, deleted: true } : null
              )
              .filter(Boolean) as any[],
          };
        });
      },
    },

    locations: {
      add(location: Partial<LocationsResponse> = {}) {
        store.update((s) => ({
          ...s,
          deleted: false,
          locations: (s.locations || []).concat({
            ...location,
            slots: [],
          } as any),
        }));
      },
      remove(index: number) {
        store.update((s) => ({
          ...s,
          locations: s.locations
            .map((l, i) =>
              i !== index ? l : l.id ? { ...l, deleted: true } : null
            )
            .filter(Boolean) as any[],
        }));
      },
    },

    slots: {
      add(locationId: string) {
        store.update((s) => ({
          ...s,
          locations: (s.locations || []).map((l, i) =>
            l.id !== locationId
              ? l
              : {
                  ...l,
                  slots: (l.slots || []).concat({
                    label: "",
                    description: "",
                    starts_at: "",
                    duration: 4 * 60,
                    limit: 0,
                  } as any),
                }
          ),
        }));
      },
      remove(locationId: string, slotIndex: number) {
        store.update((s) => ({
          ...s,
          locations: (s.locations || []).map((l, i) =>
            l.id !== locationId
              ? l
              : {
                  ...l,
                  slots: (l.slots || []).filter((s, i) => i !== slotIndex),
                }
          ),
        }));
      },
    },

    /////////////////////////

    reset: (props?: AdminEvent) => {
      store.set(props || { ...initial });
      dirty.set(false);
    },

    validate: (form) => {
      const result = get(schema).safeParse(form);
      return {
        ...result,
        error: result.error ? result.error.flatten((i) => i) : ({} as any),
      } as {
        success: boolean;
        error?: typeToFlattenedError<AdminEvent, ZodIssue>;
      };
    },

    loadFromStorage: () => {
      try {
        const props = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_TMP_KEY) || "{}"
        );
        store.set(props);
      } finally {
        dirty.set(true);
      }
    },

    storeEvent: async (props: AdminEvent) =>
      Promise.resolve()
        .then((_) =>
          localStorage.setItem(LOCAL_STORAGE_TMP_KEY, JSON.stringify(props))
        )
        .then((_) => goto(`/login?return_url=/admin/events/stored`)),

    updateEvent: async (props: AdminEvent) =>
      Promise.resolve()
        .then((_) => store.update((s) => ({ ...s, loading: true })))
        .then((_) =>
          client.send(`/api/admin/events`, { method: "post", body: props })
        )
        .then(async (updated) => {
          store.update((s) => ({ ...s, ...props, ...updated, loading: false }));
          dirty.set(false);

          if (!props.id) {
            // refresh auth for newly created team ref
            if (pb.authStore.isValid)
              await pb.collection("users").authRefresh();

            goto(`/admin/events/${get(store).id}/`);
          }
        })
        .catch((e) => {
          store.update((s) => ({ ...s, loading: false }));
          dirty.set(true);
        }),
  };
}

export const AdminEventStore = createAdminEventStore({
  loading: false,
  locations: [],
  questions: [],
} as any);
