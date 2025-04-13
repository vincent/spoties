import { goto } from "$app/navigation";
import { client } from "$lib/pocketbase";

if (client.authStore.isValid) goto('/')
