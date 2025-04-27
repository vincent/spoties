import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { client } from '$lib/pocketbase';
import { goto } from '$app/navigation';

export async function load(event: ServerLoadEvent) {
	if (!client.authStore.isValid) {
		console.log(`unverified user attempt to load ${event.url}`)
		goto('/')
	}
}