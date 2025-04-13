<script lang="ts">
    import { A, Button, Datepicker, Input, Range, Textarea, TimelineItem } from "flowbite-svelte";
    import { CheckCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import { CrossIcon } from "lucide-svelte";

    let {
        value = $bindable(),
        removeLocationTimeSlot
    } = $props()

    const resetEditing = {
        label: false,
        description: false,
        starts_at: false,
        duration: false,
        reset: false,
    }
    let editing = $state(resetEditing)
    const toggleEdit = (key: keyof typeof editing) => () => editing = { ...resetEditing, [key]: !editing[key] }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<TimelineItem>
    <div class="flex justify-between mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {#if editing.label}
        <div class="flex"><Input size="sm" bind:value={value.label} required onblur={toggleEdit('label')} /> <CheckCircleOutline onclick={toggleEdit('label')}/></div>
        {:else if value.label}
        <div class="flex" onclick={toggleEdit('label')}>{value.label}</div>
        {:else}
        <div class="flex" onclick={toggleEdit('label')}><span class="text-gray-300 font-italic">Set slot title</span></div>
        {/if}
        <div class="flex">
            <Datepicker bind:value={value.starts_at} />
            <button
                type="button"
                class="ml-2 inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                onclick={removeLocationTimeSlot}
            ><TrashBinOutline /></button>
        </div>
    </div>

    <div class="flex mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {#if editing.description}
            <div class="flex"><Textarea bind:value={value.description} required /> <CheckCircleOutline onclick={toggleEdit('description')}/></div>
        {:else if value.description}
            <div class="flex" onclick={toggleEdit('description')}>{value.description}</div>
        {:else}
            <div class="flex" onclick={toggleEdit('description')}><span class="text-gray-300 font-italic">Write a short description</span></div>
        {/if}
    </div>

    <div class="flex items-center mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <p class="text-nowrap pr-2">
            {#if value.limit === 0}
                Unlimited places
            {:else}
                Limited to {value.limit} places
            {/if}
        </p>
        <Range min="0" max="10" bind:value={value.limit} />
    </div>
</TimelineItem>