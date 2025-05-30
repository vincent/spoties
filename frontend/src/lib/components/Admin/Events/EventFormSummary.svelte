<script lang="ts">
  import { t } from "$lib/i18n";
  import { AdminEventStore, dirty } from "$lib/stores/form.admin.event.svelte";
  import { Button, Helper, Spinner, Toggle } from "flowbite-svelte";
  import { CheckOutline } from "flowbite-svelte-icons";

  let { submit } = $props();
  let validation = $derived(AdminEventStore.validate($AdminEventStore));
  let activeQuestions = $derived(
    $AdminEventStore.questions.filter((q) => !q.deleted).length
  );
  let activeLocations = $derived(
    $AdminEventStore.locations.filter((l) => !l.deleted).length
  );
  let activeSlots = $derived(
    $AdminEventStore.locations
      .filter((l) => !l.deleted)
      .reduce((acc, loc) => acc + loc.slots?.length, 0)
  );
</script>

<div class="w-full max-w-xl flex-none">
  <div
    class="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6 dark:border-gray-700"
  >
    <p class="text-xl font-semibold text-gray-900 dark:text-white">
      {$t("event.form.summary")}
    </p>

    <div class="space-y-4">
      <div class="space-y-2">
        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t("event.form.questions")}
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {activeQuestions}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t("event.form.locations")}
          </dt>
          <dd class="text-base font-medium text-gray-900 dark:text-white">
            {activeLocations}
          </dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            {$t("event.form.slots")}
          </dt>
          <dd class="text-base font-medium text-green-600">
            {activeSlots}
          </dd>
        </dl>

        <dl class="mt-8 flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            <Toggle bind:checked={$AdminEventStore.published}
              >{$t("event.published")}</Toggle
            >
          </dt>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
            <Toggle bind:checked={$AdminEventStore.sealed}
              >{$t("event.sealed")}</Toggle
            >
          </dt>
        </dl>

        <div class="items-top mt-6 flex justify-between">
          <Button
            class="form-submit w-5/5"
            onclick={submit}
            outline={!$dirty}
            disabled={!validation.success || $AdminEventStore.loading}
            >{$t("act.save")}
            {#if $AdminEventStore.loading}<Spinner
                size="4"
                class="ms-2 h-6 w-6 text-white"
              />{:else if !$dirty}<CheckOutline
                class="ms-2 h-6 w-6 text-white"
              />{/if}
          </Button>
        </div>

        {#if !validation.success}
          <Helper class="text-primary-600 dark:text-primary-500"
            >{$t("event.form.fix_errors")}</Helper
          >
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- <pre>{JSON.stringify(AdminEventStore.validate($AdminEventStore), null, 2)}</pre> -->
