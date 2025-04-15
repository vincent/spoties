<script lang="ts">
	import LocationsSelector from "../Locations/LocationsSelector.svelte";
	import { Label, FloatingLabelInput, A } from "flowbite-svelte";
	import { AdminEventStore } from "$lib/stores/admin-event-form";
    import QuestionsForm from "../Questions/QuestionsForm.svelte";
    import RichText from "$lib/components/Shared/RichText.svelte";

	const { locations } = $props();
</script>

<form onsubmit={() => AdminEventStore.updateEvent($AdminEventStore)}>
	<FloatingLabelInput classDiv="mb-4" classInput="text-3xl" type="text" bind:value={$AdminEventStore.title}>
		The event title
	</FloatingLabelInput>

	{#if $AdminEventStore.id}
		<div class="mb-6">
			<Label class="mb-2 block text-2xl">Public link</Label>
			<A target="_blank" href={`/event/${$AdminEventStore.id}`}>{`/event/${$AdminEventStore.id}`}</A>
		</div>
	{/if}

	<div class="mb-6">
		<Label for="event-description" class="mb-2 block text-2xl">Description</Label>
		<RichText bind:value={$AdminEventStore.description} />
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
