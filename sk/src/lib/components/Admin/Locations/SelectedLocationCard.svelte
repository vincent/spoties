<script>
  import { EditOutline, MapPinAltOutline, PlusOutline } from "flowbite-svelte-icons";
  import { Button, Hr, Timeline } from "flowbite-svelte";
  import TimeSlotForm from "../TimeSlotForm.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
  import DeleteButton from "$lib/components/Shared/DeleteButton.svelte";

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
    <MapPinAltOutline size="xl" class="text-gray-600 dark:text-gray-200" />

    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2">
      <span class="text-gray-600 dark:text-gray-200">{value.name}</span>
      <p class="text-gray-600 dark:text-gray-200">{@html value.description}</p>

      <div class="mt-2 flex items-center gap-4">
        <DeleteButton confirm={() => AdminEventStore.removeLocation(value)} />
        <button
          type="button"
          class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
          onclick={() => showSlots = !showSlots}
        >
          <EditOutline /> {showSlots ? 'Hide slots' : `Edit ${value.slots.length} slots`}
        </button>
      </div>
    </div>
  </div>

  {#if showSlots}
    <Hr classHr="my-8" />

    <Timeline>
      {#each value.slots as s, index}
        <TimeSlotForm
          {index}
          {locationIndex}
          removeLocationTimeSlot={() => AdminEventStore.removeLocationTimeSlot(value.id, index)}
          bind:value={$AdminEventStore.locations[locationIndex].slots[index]}
        />
      {/each}
    </Timeline>
    
    <div class="flex justify-end">
      <Button
        onclick={() => AdminEventStore.addLocationTimeSlot(value.id)}
        ><PlusOutline /> Add slot
      </Button>
    </div>
  {/if}
</div>
