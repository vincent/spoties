<script>
	import { Label, Input, Textarea } from "flowbite-svelte";
	import LocationsSelector from "../Locations/LocationsSelector.svelte";
	import { AdminEventStore } from "$lib/stores/admin-event-form";

	const { locations } = $props();

	console.log($AdminEventStore)
</script>

<h1 class="mb-4 text-3xl">{$AdminEventStore.id ? 'Edit event' : 'Create a new event' }</h1>

<form onsubmit={() => AdminEventStore.updateEvent($AdminEventStore)}>
	<div class="mb-6">
		<Label for="event-title" class="mb-2 block text-xl">Title</Label>
		<Input id="event-title" placeholder="The event title" bind:value={$AdminEventStore.title}/>
	</div>

	<div class="mb-6">
		<Label for="event-description" class="mb-2 block text-xl">Description</Label>
		<Textarea
			id="event-description"
			bind:value={$AdminEventStore.description}
			rows={8}
			placeholder="The event description"
		></Textarea>
	</div>

	<div class="mb-6">
		<Label for="event-locations" class="mb-2 block text-xl">Locations</Label>
		<LocationsSelector
			{locations}
			bind:value={$AdminEventStore.locations}
			submit={() => AdminEventStore.updateEvent($AdminEventStore)}
		/>
	</div>
</form>
