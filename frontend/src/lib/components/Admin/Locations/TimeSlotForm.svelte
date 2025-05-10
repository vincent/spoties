<script lang="ts">
  import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
  import { Datepicker, Range, TimelineItem } from "flowbite-svelte";
  import DeleteButton from "../../Shared/DeleteButton.svelte";
  import Placeholder from "../..//Shared/Placeholder.svelte";
  import EditInPlace from "../../Shared/EditInPlace.svelte";
  import FieldErrors from "../../Shared/FieldErrors.svelte";
  import { t } from "$lib/i18n";
  
  let {
    value = $bindable(),
    index,
    locationIndex,
    removeLocationTimeSlot
  } = $props()

  let validation = $derived(AdminEventStore.valid($AdminEventStore))
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<TimelineItem title="" date="">
  <div class="flex justify-between mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    <EditInPlace divClass="w-3/5" bind:value={$AdminEventStore.locations[locationIndex].slots[index].label}>
      <div class="flex"><Placeholder value={value.label} empty={$t('event.form.add_slot_name')}/></div>
    </EditInPlace>
  
    <div class="flex slot-actions">
      <Datepicker 
        value={$AdminEventStore.locations[locationIndex].slots[index].starts_at ? new Date(Date.parse($AdminEventStore.locations[locationIndex].slots[index].starts_at)) : undefined}
        onselect={e => $AdminEventStore.locations[locationIndex].slots[index].starts_at = e.toString()}
        onclear={() => $AdminEventStore.locations[locationIndex].slots[index].starts_at = ''}
      />
      
      <DeleteButton btnClass="ms-2" confirm={removeLocationTimeSlot} />
    </div>
  </div>

  {#if validation?.error?.fieldErrors?.locations}
    <div class="mb-2">
      {#each validation?.error?.fieldErrors?.locations as error}
        {#if error.path[1] === locationIndex && error.path[3] === index && error.path[4] === 'label'}
          <FieldErrors validationErrors={[error]} />
        {/if}
      {/each}
    </div>
  {/if}

  <div class="flex mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    <EditInPlace divClass="w-full" input="richtext" bind:value={$AdminEventStore.locations[locationIndex].slots[index].description}>
      <div class="flex"><Placeholder value={value.description} empty={$t('event.form.add_slot_desc')}/></div>
    </EditInPlace>
  </div>

  <div class="flex items-center mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    <p class="text-nowrap pr-2">
      {#if value.limit === 0}
        {$t('event.places_unlimited')}
      {:else}
        {$t('event.places_limited_to', value)}
      {/if}
    </p>
    <Range min="0" max="10" bind:value={$AdminEventStore.locations[locationIndex].slots[index].limit} />
  </div>
</TimelineItem>

<style>
  :global(.slot-actions > .relative) {
    width: 18rem;
  }
</style>