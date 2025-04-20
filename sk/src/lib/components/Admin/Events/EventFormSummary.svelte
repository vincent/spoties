<script lang="ts">
    import { t } from "$lib/i18n";
    import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
    import { Button, Helper } from "flowbite-svelte";
    import { CheckOutline } from "flowbite-svelte-icons";

    let { submit } = $props();

    let validation = $derived(AdminEventStore.valid($AdminEventStore))
    let totalSlots = $derived($AdminEventStore.locations.reduce((acc, loc) => acc + loc.slots?.length, 0));
</script>

<div class="w-full flex-none max-w-xl">
  <div
    class="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6 dark:border-gray-700"
  >
    <p class="text-xl font-semibold text-gray-900 dark:text-white">Summary</p>

    <div class="space-y-4">
      <div class="space-y-2">
        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            Event questions
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {$AdminEventStore.questions.length}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            Locations
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {$AdminEventStore.locations.length}
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

        <Button class="mt-6 w-full" disabled={!validation.success} onclick={submit}>
          Save <CheckOutline class="w-6 h-6 ms-2 text-white" />
        </Button>

        {#if !validation.success}
          <Helper color="red">{$t('event.form.fix_errors')}</Helper>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- <pre>{JSON.stringify(AdminEventStore.valid($AdminEventStore), null, 2)}</pre> -->
