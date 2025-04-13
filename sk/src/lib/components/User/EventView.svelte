<script lang="ts">
	import { userEventStore as store, userEventStore } from "$lib/stores/user-event-form";
	import { Label, Input, Textarea, Card, Range, Rating, Datepicker, Toggle, Radio, Checkbox, Button, Helper, MultiSelect, Badge, Banner } from "flowbite-svelte";
    import { MapPinAltOutline } from "flowbite-svelte-icons";
    import { ArrowUpFromLine, UserCircle } from "lucide-svelte";
    import { client } from "$lib/pocketbase";
    import BannerPrefillEvent from "./BannerPrefillEvent.svelte";

	let { record, userData } = $props()

	const user = client.authStore.record as any
	const username = user.name || user.email?.split(/@/)[0]
	const somePreviousAnswers = Object.values(userData?.questions_answers || {}).some((a: any) => a.value)

	// Public store for handling event form data
	store.set({
		event_id: record.id,
		questions_answers: {
			...record.questions.reduce((acc, question) => ({
				...acc,
				[question.id]: {
					question,
					value: question.answer_type === 'select_many' ? [] : null,
				}
			}), {}),
			...(userData.questions_answers || {})
		},
		slots_answers: {
			...record.locations.map(l => l.slots).flat().reduce((acc, s) => ({
				...acc,
				[s.id]: null
			}), {}),
			...(userData.slots_answers || {})
		},
	});

	function multiSelectChoices(choices: any[]) {
		return choices.map(({ name }) => ({ name, value: name }))
	}

	function submitEventForm() {
		// Handle form submission logic here
		console.log($store);
		userEventStore.updateUserAnswer($store)
	}
</script>

{#if somePreviousAnswers}
	<BannerPrefillEvent {username} />
{/if}

<form onsubmit={submitEventForm}>
	<h1 class="mt-6 mb-10 block text-4xl">{record.title}</h1>

	<div class="mb-6">
		{@html record.description}
	</div>

	<div class="mb-6">
		{#each record.questions as q, i}
			<div class="space-y-4">
				<Card size="none" class="mt-2 {$store.questions_answers[q.id].value !== null ? 'border-2 border-primary-600' : ''}">
					<div class="mb-2">{@html q.label}</div>

					{#if q.answer_type === 'simple_text'}
						<Input size="md" type="text" placeholder={q.properties?.placeholder} bind:value={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'rich_text'}
						<Textarea rows={8} placeholder={q.properties?.rich_placeholder} bind:value={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'rating'}
						<Rating size={48} bind:rating={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'range'}
						<Range bind:value={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'date'}
						<Datepicker bind:value={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'time'}
						<Datepicker bind:value={$store.questions_answers[q.id].value} />

					{:else if q.answer_type === 'yes_no'}
						<Toggle bind:checked={$store.questions_answers[q.id].value}>{$store.questions_answers[q.id].value ? 'Yes' : 'No' /** FIXME */}</Toggle>

					{:else if q.answer_type === 'checkboxes' && q.properties?.choices !== undefined}
						{#each q.properties.choices as choice, ci}
							<Checkbox bind:value={$store.questions_answers[q.id].value} bind:group={q.properties}>{choice.name}</Checkbox>
						{/each}

					{:else if q.answer_type === 'select_one' && q.properties?.choices?.length}
						{#each q.properties.choices as choice, ci}
							<Radio class="my-1" bind:group={$store.questions_answers[q.id].value} value={choice.name}>{choice.name}</Radio>
						{/each}

					{:else if q.answer_type === 'select_many'}
						<MultiSelect size="lg" items={multiSelectChoices(q.properties.choices)} bind:value={$store.questions_answers[q.id].value} let:item let:clear>
							<Badge dismissable params={{ duration: 100 }} on:close={clear}>{item.name}</Badge>
						</MultiSelect>
					{/if}
				</Card>
			</div>
		{/each}
	</div>

	{#if record.locations.length}
		<div class="mb-6">
			<Label class="mb-2 block text-2xl">Locations</Label>
			{#each record.locations as l, i}
				<div class="space-y-4">
					<Card size="none" class="mt-2">
						<div class="flex">
							<MapPinAltOutline size="xl" />
							<div class="mb-2 block text-xl">{l.name}</div>
						</div>

						<div class="mb-2 block text-md">{@html l.description}</div>

						{#each l.slots as s, i}
							{#if !s.deleted}
								<Checkbox class="mt-1 flex" disabled={s.limit === 0} value={s.id} bind:checked={$store.slots_answers[s.id]}>
									<span class="mr-auto">
										{s.label}
									</span>
									{#if s.starts_at}
										<Helper class="mx-2 w-50">
											{new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date(s.starts_at))}
										</Helper>
									{/if}
									{#if s.duration >= 0}
										<Helper class="mx-2 w-50">
											({s.duration} hours)
										</Helper>
									{/if}
									{#if s.starts_at}
										<span class="mx-2 w-50">
											{s.limit} places available
										</span>
									{/if}
								</Checkbox>
							{/if}
						{/each}
					</Card>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mb-8 flex justify-end-safe">
		<Button type="submit">Submit <ArrowUpFromLine class="ml-2" /></Button>
	</div>
</form>
