<script lang="ts">
	import { Input, Card, Range, Rating, Datepicker, Toggle, Radio, Checkbox, Button, MultiSelect, Textarea, Label, Spinner } from "flowbite-svelte";
    import { ArrowRightOutline, MapPinAltOutline } from "flowbite-svelte-icons";
	import { userEventStore as store } from "$lib/stores/form.event.user.svelte";
    import type { InputEventObject, UserEvent } from "$lib/pocketbase/types";
    import BannerPrefillEvent from "./BannerPrefillEvent.svelte";
    import BannerWarningEvent from "./BannerWarningEvent.svelte";
    import RichTextView from "../Shared/RichTextView.svelte";
    import FieldErrors from "../Shared/FieldErrors.svelte";
    import { formatDate } from "$lib/utils/dates.svelte";
    import RichText from "../Shared/RichText.svelte";
    import NavMini from "../Nav/NavMini.svelte";
    import { client } from "$lib/pocketbase";
    import type { ZodIssue } from "zod";
	import { t } from "$lib/i18n";

	let {
		record,
		userData
	}: {
		record: InputEventObject,
		userData: UserEvent,
	} = $props();

	const user = client.authStore.record as any;
	const username = user.name || user.email?.split(/@/)[0];
	const ownEvent = user.teams?.includes(record.team);
	const somePreviousAnswers = userData?.bookings?.id || Object.values(userData?.questions_answers || {}).some((a: any) => a.value);

	store.init(record, userData);

	let empty = $derived(!record.questions?.length && !record.locations?.length)
	let disabled = $derived(record.sealed || empty)
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

	function onsubmit(e) {
		e.preventDefault()
		store.updateUserAnswer($store)
	}
</script>

{#if ownEvent}
	<BannerWarningEvent text={'event.warning_own_event'} />
{:else if empty}
	<BannerWarningEvent text={'event.warning_empty'} />
{:else if disabled}
	<BannerWarningEvent text={'event.warning_sealed'} />
{:else if somePreviousAnswers}
	<BannerPrefillEvent {username} />
{/if}

<NavMini>
	<h1 class="mt-6 mb-10 block text-4xl text-gray-800 dark:text-gray-100">{record.title}</h1>
</NavMini>

<form class="mt-4 p-4" {onsubmit}>
	<div class="mb-6">
		<RichTextView html={record.description} />
	</div>

	<div class="mb-6">
		{#each record.questions as q}
			{#if !q.deleted}
				{@const props = q.properties || {}}
				<div class="space-y-4">
					<Card size="xl" class="p-4 mt-2 qtype-{q.answer_type} {(considerAnswered($store.questions_answers[q.id]?.value) || q.answer_type === 'just_text') ? 'border-2 border-primary-600 dark:border-secondary-800' : ''}">
						<Label class="mb-2">{@html q.label}</Label>

						{#if q.answer_type === 'just_text'}
							<p class="text-gray-800 dark:text-gray-100">{@html props.text}</p>

						{:else if q.answer_type === 'simple_text'}
							<Input {disabled} size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_name'}
							<Input {disabled} size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_age'}
							<Input {disabled} size="md" type="text" placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'private_address'}
							<Textarea {disabled} rows={3} placeholder={props.placeholder} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'rich_text' && !disabled}
							<RichText class="rounded-lg border border-gray-300 dark:border-gray-500" size={8} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'rating' && !disabled}
							<Rating size={48} rating={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'range'}
							<Range {disabled} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'date'}
							<Datepicker {disabled} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'time'}
							<Datepicker {disabled} bind:value={$store.questions_answers[q.id].value} />

						{:else if q.answer_type === 'yes_no'}
							<Toggle {disabled} checked={$store.questions_answers[q.id].value || false} onchange={e => $store.questions_answers[q.id].value = (e?.target as any)?.checked}>{$store.questions_answers[q.id].value ? $t('data.yes') : $t('data.no')}</Toggle>

						{:else if q.answer_type === 'checkboxes' && props.choices !== undefined}
							{#each q.properties?.choices as choice, ci}
								<Checkbox {disabled} value={$store.questions_answers[q.id].value} group={q.properties} onchange={e => q.properties = (q.properties||[]).concat((e?.target as any)?.checked ? $store.questions_answers[q.id].value : [])}>{choice.name}</Checkbox>
							{/each}

						{:else if q.answer_type === 'select_one' && props.choices?.length}
							{#each q.properties?.choices as choice, ci}
								<Radio {disabled} class="my-1" bind:group={$store.questions_answers[q.id].value} value={choice.name}>{choice.name}</Radio>
							{/each}

						{:else if q.answer_type === 'select_many'}
							<MultiSelect {disabled} size="lg" items={multiSelectChoices(q.properties?.choices)} bind:value={$store.questions_answers[q.id].value} />
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
				{#if !l.deleted}
					<div class="mb-4 space-y-4">
						<Card size="xl" class="p-4 {l.slots.find(s => $store.bookings.slots[s.id]) ? 'border-2 border-primary-600 dark:border-secondary-800' : ''}">
							<div class="mb-3 flex">
								<MapPinAltOutline size="xl" class="text-gray-500 dark:text-gray-400" /> <Label class="ms-2 mb-2 block text-xl">{l.name}</Label>
							</div>

							<Label class="mb-3 block text-md">{@html l.description}</Label>

							{#each l.slots as s}
								{#if !s.deleted}
									<div class="my-3">
										<Checkbox class="my-1 flex" disabled={disabled || (s.limit > 0 && s.available_seats <= 0)} value={s.id} checked={$store.bookings.slots[s.id]} onchange={e => $store.bookings.slots[s.id] = (e?.target as any)?.checked}>
											<div class="mr-auto">
												<div>{@html s.label}</div>
												<div>{@html s.description || ''}</div>
											</div>
											<div class="flex flex-col items-end">
												<div class="mx-2">
													{#if s.starts_at}
														{formatDate(new Date(s.starts_at))}
													{/if}
												</div>
												{#if s.limit > 0 && s.available_seats > -1}
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
				{/if}
			{/each}
		</div>
	{/if}

	{#if !disabled}
		<div class="mb-8 flex justify-end-safe">
			<Button
				size="lg"
				type="submit"
				disabled={!validation.success || $store.loading}
			>{$t('act.submit')} {#if $store.loading}<Spinner size="4" class="w-6 h-6 ms-2 text-white" />{:else}<ArrowRightOutline class="ml-2" />{/if}</Button>
		</div>
	{/if}
</form>

<!-- <pre>{JSON.stringify(qValidation, null, 2)}</pre> -->
