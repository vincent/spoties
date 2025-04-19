<script lang="ts">
    import { Button, Card, Datepicker, FloatingLabelInput, Input, Range, Rating, Toggle } from "flowbite-svelte";
    import { PlusOutline, QuestionCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import type { QuestionsRecord } from "$lib/pocketbase/generated-types";
    import EditInPlace from "$lib/components/Shared/EditInPlace.svelte";
    import RichText from "$lib/components/Shared/RichText.svelte";
    import AnswerTypeSelector from "./AnswerTypeSelector.svelte";
    import type { QuestionType } from "$lib/domain/questions";
	import { t } from "$lib/i18n";

    let { removeQuestion, value = $bindable<QuestionsRecord>() } = $props()
    let question = $state(value)

    function updateAnswerType(answer_type: QuestionType) {
        value = { ...value, answer_type }

        if (answer_type === 'just_text')
            value = { ...value, properties: { text: '' }}

        if (['simple_text', 'private_name', 'private_age', 'private_address'].includes(answer_type) && !value.properties?.placeholder)
            value = { ...value, properties: { placeholder: '' }}

        if (answer_type === 'rich_text' && !value.properties?.rich_placeholder)
            value = { ...value, properties: { rich_placeholder: '' }}

        if (answer_type === 'select_one' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: $t('data.option_i', {i:1}) }] }}

        if (answer_type === 'select_many' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: $t('data.option_i', {i:1}) }] }}

        if (answer_type === 'checkboxes' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: $t('data.option_i', {i:1}) }] }}
    }

    function addChoiceOption() {
        value = {
            ...value,
            properties: {
                ...(value.properties || {}),
                choices: (value.properties?.choices || [])
                    .concat({ name: $t('data.option_i', {i:(value.properties?.choices?.length || 0) + 1}) })
            }
        }
    }
</script>

<Card size="none" class="mt-2">
    <div class="flex justify-between mb-4">
        <EditInPlace divClass="w-3/6 mr-auto" input="richtext" bind:value={value.label}>
            <h5 class="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">{@html value.label || `<em>${$t('event.form.question_title')}</em>`}</h5>
        </EditInPlace>
        <AnswerTypeSelector divClass="w-2/8 mx-2" value={value.answer_type} {updateAnswerType} />
        <button type="button" onclick={removeQuestion}><TrashBinOutline /></button>
    </div>

    <!-- <pre>{ JSON.stringify(value.properties) }</pre> -->

    {#if value.answer_type === 'just_text'}
        <RichText bind:value={value.properties.text} />

    {:else if value.answer_type === 'simple_text' && value.properties?.placeholder !== undefined}
        <FloatingLabelInput type="text" bind:value={value.properties.placeholder}>
            The placeholder
        </FloatingLabelInput>

    {:else if value.answer_type === 'rich_text' && value.properties?.rich_placeholder !== undefined}
        <FloatingLabelInput type="text" bind:value={value.properties.rich_placeholder}>
            The placeholder
        </FloatingLabelInput>

    {:else if value.answer_type === 'rating'}
        <Rating rating={1} size={48} />

    {:else if value.answer_type === 'range'}
        <Range value={50} />

    {:else if value.answer_type === 'date'}
        <Datepicker />

    {:else if value.answer_type === 'time'}
        <Datepicker />

    {:else if value.answer_type === 'yes_no'}
        <Toggle>Toggle me</Toggle>

    {:else if value.answer_type === 'checkboxes' && value.properties?.choices !== undefined}
        {#each value.properties.choices as choice, ci}
            <div class="flex align-content-center justify-between my-1">
                <QuestionCircleOutline class="mr-2" /> <Input size="sm" bind:value={value.properties.choices[ci].name} />
            </div>
        {/each}
        <button
            type="button"
            class="mt-3 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            onclick={addChoiceOption}
        >
            <PlusOutline class="mr-2" /> {$t('event.form.add_choice')}
        </button>

    {:else if value.answer_type === 'select_one' && value.properties?.choices?.length}
        {#each value.properties.choices as choice, ci}
            <div class="flex align-content-center items-center justify-between my-1">
                <input type="radio" disabled class="mr-2 border-gray-500" /> <Input size="sm" bind:value={value.properties.choices[ci].name} />
            </div>
        {/each}
        <button
            type="button"
            class="mt-3 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            onclick={addChoiceOption}
        >
            <PlusOutline class="mr-2" /> {$t('event.form.add_choice')}
        </button>

    {:else if value.answer_type === 'select_many' && value.properties?.choices?.length}
        {#each value.properties.choices as choice, ci}
            <div class="flex align-content-center items-center justify-between my-1">
                <input type="radio" disabled class="mr-2 border-gray-500" /> <Input size="sm" bind:value={value.properties.choices[ci].name} />
            </div>
        {/each}
        <button
            type="button"
            class="mt-3 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            onclick={addChoiceOption}
        >
            <PlusOutline class="mr-2" /> {$t('event.form.add_choice')}
        </button>
    {/if}

    {#if value.answer_type !== 'just_text'}
        <div class="mt-4 flex justify-end">
            <Toggle bind:checked={question.required} class="italic dark:text-gray-500">{$t('data.required')}</Toggle>
        </div>
    {/if}
</Card>
