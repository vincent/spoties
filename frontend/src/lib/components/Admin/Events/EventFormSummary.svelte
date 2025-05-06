<script lang="ts">
  import { t } from "$lib/i18n";
  import { AdminEventStore, dirty } from "$lib/stores/admin-event-form.svelte";
  import { Button, Helper, Spinner, Toggle } from "flowbite-svelte";
  import { CheckOutline } from "flowbite-svelte-icons";
  
  let { submit } = $props();
  let validation = $derived(AdminEventStore.valid($AdminEventStore))
  let totalSlots = $derived($AdminEventStore.locations.reduce((acc, loc) => acc + loc.slots?.length, 0));
</script>

<div class="w-full flex-none max-w-xl">
  <div
    class="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6 dark:border-gray-700"
  >
    <p class="text-xl font-semibold text-gray-900 dark:text-white">{$t('event.form.summary')}</p>

    <div class="space-y-4">
      <div class="space-y-2">
        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t('event.form.questions')}
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {$AdminEventStore.questions.length}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t('event.form.locations')}
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {$AdminEventStore.locations.length}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t('event.form.slots')}
          </dt>
          <dd class="text-base font-medium text-green-600">
            {totalSlots}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4 mt-8">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            <Toggle bind:checked={$AdminEventStore.published}>{$t('event.published')}</Toggle>
          </dt>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            <Toggle bind:checked={$AdminEventStore.sealed}>{$t('event.sealed')}</Toggle>
          </dt>
        </dl>

        <div class="mt-6 flex justify-between items-top">
          <Button class="w-5/5" disabled={!validation.success || $AdminEventStore.loading} onclick={submit}>
            {$t('act.save')} {#if $AdminEventStore.loading}<Spinner size="4" class="w-6 h-6 ms-2 text-white" />{:else if !$dirty}<CheckOutline class="w-6 h-6 ms-2 text-white" />{/if}
          </Button>
        </div>

        {#if !validation.success}
          <Helper class="text-primary-600 dark:text-primary-500">{$t('event.form.fix_errors')}</Helper>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- <pre>{JSON.stringify(AdminEventStore.valid($AdminEventStore), null, 2)}</pre> -->
