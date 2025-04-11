<script lang="ts">
    import type { LocationsResponse, TimeSlotsRecord, TimeSlotsResponse } from "$lib/pocketbase/generated-types";
    import SelectedLocationsSummary from "./SelectedLocationsSummary.svelte";
    import AvailableLocationCard from "./AvailableLocationCard.svelte";
    import SelectedLocationCard from "./SelectedLocationCard.svelte";
    import NewLocationCard from "./NewLocationCard.svelte";
    import { AdminEventStore } from "$lib/stores/admin-event-form";

    type Props = {
        locations: any[]
        value: any[]
        submit: CallableFunction
    }

    let {
        value = $bindable(),
        locations,
    }: Props = $props()

    let unselectedLocations = $derived(locations.filter(l => !value.some(v => v.id === l.id)))
    let selectedLocations = $derived(value || [])

    
</script>

<section class="p-1 antialiased">
    <div class="md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
                {#each $AdminEventStore.locations as l, i}
                    <SelectedLocationCard
                        bind:value={$AdminEventStore.locations[i]}
                        locationIndex={i}
                    />
                {:else}
                    Add some locations to your event
                {/each}
            </div>

            <!-- available -->
            <div class="hidden xl:mt-8 xl:block">
                <h3 class="text-xl text-gray-900 dark:text-white">
                    Available locations
                </h3>
                <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                    <NewLocationCard onclick={() => null} />

                    {#each unselectedLocations as location}
                        <AvailableLocationCard
                            {location}
                            addLocation={AdminEventStore.addLocation}
                        />
                    {/each}
                </div>
            </div>
        </div>

        <SelectedLocationsSummary
            {selectedLocations}
            submit={() => AdminEventStore.updateEvent($AdminEventStore)}
        />
    </div>
</section>
