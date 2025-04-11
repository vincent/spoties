<script>
    import { EditOutline, PlusOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import { Button, Hr, Timeline } from "flowbite-svelte";
    import TimeSlotForm from "../TimeSlotForm.svelte";
    import { AdminEventStore } from "$lib/stores/admin-event-form";

    let {
        value = $bindable(),
        locationIndex,
    } = $props();

    let showSlots = $state(false)
</script>

<div
    class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800"
>
    <div
        class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
    >
        <a href="#" class="shrink-0 md:order-1">
            <img
                class="h-20 w-20 dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="imac image"
            />
            <img
                class="hidden h-20 w-20 dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt="imac image"
            />
        </a>

        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2">
            <span>{value.name}</span>
            <p>{value.description}</p>

            <div class="mt-2 flex items-center gap-4">
            <button
                type="button"
                class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                onclick={() => showSlots = !showSlots}
            >
                <EditOutline /> {showSlots ? 'Hide slots' : 'Edit slots'}
            </button>

            <button
                type="button"
                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                onclick={() => AdminEventStore.removeLocation(value)}
            >
                <TrashBinOutline /> Remove
            </button>
            </div>
        </div>
    </div>

    {#if showSlots}
        <Hr classHr="my-8" />

        <Timeline>
            {#each value.slots as s, i}
                <TimeSlotForm bind:value={$AdminEventStore.locations[locationIndex].slots[i]} />
            {/each}
        </Timeline>
        
        <div class="flex justify-end">
            <Button onclick={() => AdminEventStore.addLocationTimeSlot(value.id)}><PlusOutline /> Add slot</Button>
        </div>
    {/if}
</div>
