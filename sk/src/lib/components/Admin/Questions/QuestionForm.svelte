<script lang="ts">
    import { PlusOutline, QuestionCircleOutline } from "flowbite-svelte-icons";
    import AnswerTypeSelector from "./AnswerTypeSelector.svelte";
    import { Card, Datepicker, FloatingLabelInput, Input, MultiSelect, Range, Rating, Textarea, Toggle } from "flowbite-svelte";
    import EditInPlace from "$lib/components/Shared/EditInPlace.svelte";

    let { value = $bindable() } = $props()
    let question = $state(value)

    function updateAnswerType(answer_type: string) {
        value = { ...value, answer_type }

        if (answer_type === 'simple_text' && !value.properties?.placeholder)
            value = { ...value, properties: { placeholder: '' }}

        if (answer_type === 'rich_text' && !value.properties?.rich_placeholder)
            value = { ...value, properties: { rich_placeholder: '' }}

        if (answer_type === 'select_one' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: 'Option 1' }] }}

        if (answer_type === 'select_many' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: 'Option 1' }] }}

        if (answer_type === 'checkboxes' && !value.properties?.choices)
            value = { ...value, properties: { choices: [{ name: 'Option 1' }] }}
    }

    function addChoiceOption() {
        value = {
            ...value,
            properties: {
                ...(value.properties || {}),
                choices: (value.properties?.choices || [])
                    .concat({ name: `Option ${(value.properties?.choices?.length || 0) + 1}` })
            }
        }
    }
</script>

<Card size="none" class="mt-2">
    <div class="flex justify-between mb-4">
        <EditInPlace divClass="w-4/6 mr-auto" bind:value={value.label}>
            <h5 class="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">{@html value.label || `<em>${'Question title'}</em>`}</h5>
        </EditInPlace>
        <AnswerTypeSelector divClass="w-1/6" value={value.answer_type} {updateAnswerType} />
    </div>

    <!-- <pre>{ JSON.stringify(value.properties) }</pre> -->

    {#if value.answer_type === 'simple_text' && value.properties?.placeholder !== undefined}
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
            <PlusOutline class="mr-2" /> Add a choice
        </button>

    {:else if value.answer_type === 'select_one' && value.properties?.choices?.length}
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
            <PlusOutline class="mr-2" /> Add a choice
        </button>

    {:else if value.answer_type === 'select_many' && value.properties?.choices?.length}
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
            <PlusOutline class="mr-2" /> Add a choice
        </button>
    {/if}

    <div class="mt-4 flex justify-end">
        <Toggle bind:checked={question.required} class="italic dark:text-gray-500">Required</Toggle>
    </div>
</Card>
