<script lang="ts">
  import AvailableLocationCard from "./AvailableLocationCard.svelte";
  import SelectedLocationCard from "./SelectedLocationCard.svelte";
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  import NewLocationCard from "./NewLocationCard.svelte";
  import { t } from "$lib/i18n";

  type Props = {
    locations: any[]
    value: any[]
  }

  let {
    value = $bindable(),
    locations,
  }: Props = $props()

  let unselectedLocations = $derived(locations.filter(l => !value.some(v => v.id === l.id)))
</script>

<section class="p-1 antialiased">
  <div class="flex gap-6">
    <div class="w-full">
      <div class="space-y-6">
        {#each $AdminEventStore.locations as l, i}
          {#if !l.deleted}
            <SelectedLocationCard
              bind:value={$AdminEventStore.locations[i]}
              locationIndex={i}
            />
          {/if}
        {:else}
          {$t('event.form.add_locations')}
        {/each}
      </div>

      <!-- available -->
      <div class="hidden xl:mt-8 xl:block">
        <h3 class="text-xl text-gray-900 dark:text-white">
          {$t('event.form.available_locations')}
        </h3>
        <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
          <NewLocationCard onclick={AdminEventStore.locations.add} />

          {#each unselectedLocations as location}
            <AvailableLocationCard
              {location}
              addLocation={AdminEventStore.locations.add}
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
