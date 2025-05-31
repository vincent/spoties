import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { fetchUserAnsweredEvents } from "$lib/domain/events";
import { client } from "$lib/pocketbase";

export async function load({ url, fetch }: ServerLoadEvent) {
  if (!client.authStore.isValid) {
    return redirect(
      303,
      url.pathname.match(/^\/event\/\w/) ? `/login?return_url=${url}` : "/"
    );
  }

  const answeredEvents = await fetchUserAnsweredEvents({ fetch });

  return {
    answeredEvents,
    createdEventsCount: 0,
  };
}
