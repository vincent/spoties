<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { CheckOutline } from "flowbite-svelte-icons";

    let { selectedLocations, submit } = $props();

    let totalLocations = $derived(selectedLocations?.length);
    let totalSlots = $derived(selectedLocations.reduce((acc, loc) => acc + loc.slots?.length, 0));
</script>

<div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
  <div
    class="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6 dark:border-gray-700"
  >
    <p class="text-xl font-semibold text-gray-900 dark:text-white">Summary</p>

    <div class="space-y-4">
      <div class="space-y-2">
        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            Locations
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {totalLocations}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            Total spots
          </dt>
          <dd class="text-base font-medium text-green-600">
            {totalSlots}
          </dd>
        </dl>

        <Button class="mt-6 w-full" onclick={submit}>
          Save <CheckOutline class="w-6 h-6 ms-2 text-white" />
        </Button>
      </div>
    </div>
  </div>
</div>
