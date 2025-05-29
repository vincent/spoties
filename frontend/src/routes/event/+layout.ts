import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { client } from "$lib/pocketbase";
import { goto } from "$app/navigation";

export async function load(event: ServerLoadEvent) {
  if (!client.authStore.isValid) {
    return redirect(
      303,
      event.url.pathname.match(/^\/event\/\w/)
        ? `/login?return_url=${event.url}`
        : "/"
    );
  }
}
