<script lang="ts">
    import { Datepicker, Range, TimelineItem } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import RichText from "../Shared/RichText.svelte";
    import EditInPlace from "../Shared/EditInPlace.svelte";
    
    let {
        value = $bindable(),
        removeLocationTimeSlot
    } = $props()
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<TimelineItem>
    <div class="flex justify-between mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <EditInPlace divClass="w-full" input="richtext" bind:value={value.label}>
            <div class="flex">{@html value.label}</div>
        </EditInPlace>
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
        <EditInPlace divClass="w-full" input="richtext" bind:value={value.description}>
            <div class="flex">{@html value.description}</div>
        </EditInPlace>
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