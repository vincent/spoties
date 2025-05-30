<script>
  import { PlusOutline } from "flowbite-svelte-icons";
  import { Button, Hr, Timeline } from "flowbite-svelte";
  import TimeSlotForm from "./TimeSlotForm.svelte";
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  import DeleteButton from "$lib/components/Shared/DeleteButton.svelte";
  import {
    ListChecksIcon,
    MapPinCheckIcon,
    MapPinMinusIcon,
  } from "lucide-svelte";
  import EditInPlace from "$lib/components/Shared/EditInPlace.svelte";
  import { t } from "$lib/i18n";
  import Placeholder from "$lib/components/Shared/Placeholder.svelte";

  let { value = $bindable(), locationIndex } = $props();

  let showSlots = $state(value.slots.length === 0);
</script>

<div
  class={`location-form location-form-${locationIndex} rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800`}
>
  <div
    class="md:items-top space-y-4 md:flex md:justify-between md:gap-6 md:space-y-0"
  >
    {#if $AdminEventStore.locations[locationIndex].geo_place}
      <a
        target="_blank"
        href={`https://maps.google.com/?ll=${$AdminEventStore.locations[locationIndex].geo_place}`}
      >
        <MapPinCheckIcon size={40} class="text-gray-600 dark:text-gray-200" />
      </a>
    {:else}
      <MapPinMinusIcon size={40} class="text-gray-600 dark:text-gray-200" />
    {/if}

    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2">
      <EditInPlace
        input="geo"
        divClass={`location-name location-name-${locationIndex}`}
        bind:value={$AdminEventStore.locations[locationIndex].name}
        bind:altValue={$AdminEventStore.locations[locationIndex].geo_place}
      >
        <div class="mb-2 font-semibold text-gray-600 dark:text-gray-200">
          <Placeholder
            value={$AdminEventStore.locations[locationIndex].name}
            empty={$t("event.form.new_location")}
          />
        </div>
      </EditInPlace>

      <EditInPlace
        input="richtext"
        divClass={`location-description location-description-${locationIndex}`}
        bind:value={$AdminEventStore.locations[locationIndex].description}
      >
        <p class="text-gray-600 dark:text-gray-200">
          <Placeholder
            value={$AdminEventStore.locations[locationIndex].description}
            empty={$t("event.form.description")}
          />
        </p>
      </EditInPlace>

      <div class="mt-2 flex justify-end gap-4">
        <button
          type="button"
          class={`location-slots-toggle location-slots-toggle-${locationIndex} inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white`}
          onclick={() => (showSlots = !showSlots)}
        >
          <ListChecksIcon class="mx-1" />
          {$t(showSlots ? "event.form.hide_slots" : "event.form.show_slots", {
            count: $AdminEventStore.locations[locationIndex].slots.length,
          })}
        </button>
        <DeleteButton
          confirm={() => AdminEventStore.locations.remove(locationIndex)}
        />
      </div>
    </div>
  </div>

  {#if showSlots}
    <Hr class="my-8" />

    <Timeline>
      {#each value.slots as s, index}
        <TimeSlotForm
          {index}
          {locationIndex}
          removeLocationTimeSlot={() =>
            AdminEventStore.slots.remove(value.id, index)}
          bind:value={$AdminEventStore.locations[locationIndex].slots[index]}
        />
      {/each}
    </Timeline>

    <div class="flex justify-end">
      <Button onclick={() => AdminEventStore.slots.add(value.id)}
        ><PlusOutline /> {$t("event.form.add_slot")}
      </Button>
    </div>
  {/if}
</div>
