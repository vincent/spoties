<script lang="ts">
	import { Input, Card, Range, Rating, Datepicker, Toggle, Radio, Checkbox, Button, MultiSelect, Badge, Textarea } from "flowbite-svelte";
	import { userEventStore as store } from "$lib/stores/user-event-form";
    import BannerPrefillEvent from "./BannerPrefillEvent.svelte";
    import { ArrowRightOutline, MapPinAltOutline } from "flowbite-svelte-icons";
    import { client } from "$lib/pocketbase";
    import NavMini from "../Nav/NavMini.svelte";
    import RichText from "../Shared/RichText.svelte";
    import RichTextView from "../Shared/RichTextView.svelte";
	import { t } from "$lib/i18n";
    import type { ZodIssue } from "zod";
    import FieldErrors from "../Shared/FieldErrors.svelte";

	let { record, userData } = $props()
	
	const user = client.authStore.record as any
	const username = user.name || user.email?.split(/@/)[0]
	const somePreviousAnswers = Object.values(userData?.questions_answers || {}).some((a: any) => a.value)

	// Public store for handling event form data
	const initial = {
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
		bookings: {
			...record.locations.map(l => l.slots).flat().reduce((acc, s) => ({
				...acc,
				[s.id]: null
			}), {}),
			...(userData.bookings || {})
		},
	};

	store.set(initial);
	store.updateValidation(initial);

	let validation = $derived(store.valid($store))
	let qValidation = $derived<Record<string, ZodIssue>>(
		(validation?.error?.fieldErrors?.questions_answers || []).reduce((acc, qe) => ({
			...acc,
			[qe.path[1]]: qe
		}), {})
	)

	function considerAnswered(value) {
		if (value?.slice) return !!value.length;
		if (value === 0) return true;
		if (value) return true;
		return false
	}

	function multiSelectChoices(choices: any[]) {
		return choices.map(({ name }) => ({ name, value: name }))
	}
</script>

{#if somePreviousAnswers}
	<BannerPrefillEvent {username} />
{/if}

<NavMini>
	<h1 class="mt-6 mb-10 block text-4xl text-gray-800 dark:text-gray-100">{record.title}</h1>
</NavMini>

<form class="mt-4" onsubmit={() => store.updateUserAnswer($store)}>
	<div class="mb-6">
		<RichTextView html={record.description} />
	</div>

	<div class="mb-6">
		{#each record.questions as q, i}
			{#if !q.deleted}
				{@const props = q.properties || {}}
				<div class="space-y-4">
					<Card size="none" class="mt-2 qtype-{q.answer_type} {(considerAnswered($store.questions_answers[q.id]?.value) || q.answer_type === 'just_text') ? 'border-2 border-primary-600 dark:border-secondary-800' : ''}">
						<div class="mb-2">{@html q.label}</div>

						{#if q.answer_type === 'just_text'}
							<p>{@html q.properties.text}</p>

						{:else if q.answer_type === 'simple_text'}
							<Input size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_name'}
							<Input size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_age'}
							<Input size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_address'}
							<Textarea rows={3} placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'rich_text'}
							<RichText size={8} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'rating'}
							<Rating size={48} bind:rating={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'range'}
							<Range bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'date'}
							<Datepicker bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'time'}
							<Datepicker bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'yes_no'}
							<Toggle bind:checked={$store.questions_answers[q.id].value}>{$store.questions_answers[q.id].value ? $t('data.yes') : $t('data.no')}</Toggle>

						{:else if q.answer_type === 'checkboxes' && props.choices !== undefined}
							{#each q.properties.choices as choice, ci}
								<Checkbox bind:value={$store.questions_answers[q.id].value} bind:group={q.properties}>{choice.name}</Checkbox>
							{/each}

						{:else if q.answer_type === 'select_one' && props.choices?.length}
							{#each q.properties.choices as choice, ci}
								<Radio class="my-1" bind:group={$store.questions_answers[q.id].value} value={choice.name}>{choice.name}</Radio>
							{/each}

						{:else if q.answer_type === 'select_many'}
							<MultiSelect size="lg" items={multiSelectChoices(q.properties.choices)} bind:value={$store.questions_answers[q.id].value} let:item let:clear>
								<Badge dismissable params={{ duration: 100 }} on:close={clear}>{item.name}</Badge>
							</MultiSelect>
						{/if}

						<FieldErrors validationErrors={qValidation[q.id] ? [qValidation[q.id]] : null} />
					</Card>
				</div>
			{/if}
		{/each}
	</div>

	{#if record.locations.length}
		<div class="mb-6">
			{#each record.locations as l, i}
				<div class="space-y-4">
					<Card size="none" class="mt-2">
						<div class="mb-3 flex">
							<MapPinAltOutline size="xl" />
							<div class="mb-2 block text-xl">{l.name}</div>
						</div>

						<div class="mb-3 block text-md">{@html l.description}</div>

						{#each l.slots as s, i}
							{#if !s.deleted}
								<div class="my-3">
									<Checkbox class="my-1 flex" disabled={s.limit === 0} value={s.id} bind:checked={$store.bookings.slots[s.id]}>
										<div class="mr-auto">
											<div>{@html s.label}</div>
											<div>{@html s.description || ''}</div>
										</div>
										<div class="flex flex-col items-end">
											<div class="mx-2">
												{#if s.starts_at}
													{new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date(s.starts_at))}
												{/if}
												{#if s.duration >= 0} - {$t('event.duration', s)}{/if}
											</div>
											{#if s.limit > -1}
												<div class="mx-2">
													{$t('event.places_limit', s)}
												</div>
											{/if}
										</div>	
									</Checkbox>
								</div>
							{/if}
						{/each}
					</Card>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mb-8 flex justify-end-safe">
		<Button type="submit" disabled={!validation.success}>{$t('act.submit')} <ArrowRightOutline class="ml-2" /></Button>
	</div>
</form>

<!-- <pre>{JSON.stringify(qValidation, null, 2)}</pre> -->
