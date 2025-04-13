<script>
	import { Label, Textarea, FloatingLabelInput, A } from "flowbite-svelte";
	import LocationsSelector from "../Locations/LocationsSelector.svelte";
	import { AdminEventStore } from "$lib/stores/admin-event-form";
    import QuestionsForm from "../Questions/QuestionsForm.svelte";

	const { locations } = $props();
</script>

<form onsubmit={() => AdminEventStore.updateEvent($AdminEventStore)}>
	<FloatingLabelInput classDiv="mb-4" classInput="text-3xl" type="text" bind:value={$AdminEventStore.title}>
		The event title
	</FloatingLabelInput>

	{#if $AdminEventStore.id}
		<div class="mb-6">
			<Label for="event-description" class="mb-2 block text-2xl">Public link</Label>
			<A target="_blank" href={`/event/${$AdminEventStore.id}`}>{`/event/${$AdminEventStore.id}`}</A>
		</div>
	{/if}

	<div class="mb-6">
		<Label for="event-description" class="mb-2 block text-2xl">Description</Label>
		<Textarea
			id="event-description"
			bind:value={$AdminEventStore.description}
			rows={8}
			placeholder="The event description"
		></Textarea>
	</div>

	<div class="mb-6">
		<Label for="event-questions" class="mb-2 block text-2xl">Questions</Label>
		<QuestionsForm
			bind:value={$AdminEventStore.questions}
		/>
	</div>

	<div class="mb-6">
		<Label for="event-locations" class="mb-2 block text-2xl">Locations</Label>
		<LocationsSelector
			{locations}
			bind:value={$AdminEventStore.locations}
			submit={() => AdminEventStore.updateEvent($AdminEventStore)}
		/>
	</div>
</form>
