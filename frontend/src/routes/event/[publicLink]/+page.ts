import { fetchEventUserAnswers } from "$lib/domain/answers.user";
import { fetchEvent } from "$lib/domain/events";
import type { LayoutLoad } from "../../$types";
import { client } from "$lib/pocketbase";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ url, params, fetch }) => {

  if (!client.authStore.isValid) {
    return redirect(
      303,
      url.pathname.match(/^\/event\/\w/)
        ? `/login?return_url=${url}`
        : '/'
    )
  }

  const { publicLink } = params;
  const options = { fetch };
  const record = await fetchEvent(publicLink as string, options)
  const userAnswers = await fetchEventUserAnswers(record.id, client.authStore.record?.id as string, options)

  return {
    record,
    userAnswers
  };
};
