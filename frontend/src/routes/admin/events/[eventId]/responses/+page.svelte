<script lang="ts">
  import EventResponsesTableByUser from "$lib/components/Admin/Events/EventResponsesTableByUser.svelte";
  import EventResponsesTableBySlot from "$lib/components/Admin/Events/EventResponsesTableBySlot.svelte";
  import { arrayToCSV, responsesToArray, downloadBlob } from "$lib/utils/csv";
  import { Button, Dropdown, DropdownItem, Toggle } from "flowbite-svelte";
  import { type UserBookingResponse } from "$lib/pocketbase/types";
  import { eventAnyChanges, fetchEvent } from "$lib/domain/events";
  import { fetchEventAllAnswers } from "$lib/domain/answers.all";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { locale, stripTags, t } from "$lib/i18n";
  import { onMount } from "svelte";

  let { data } = $props();
  let groupBy = $state("user");
  let eventId = $derived<string>(data.eventId as string);
  let secondaryGroups = $state<Record<string, boolean>>({});

  onMount(() =>
    eventAnyChanges(eventId, () =>
      Promise.all([
        fetchEvent(eventId, { fetch }),
        fetchEventAllAnswers(eventId, { fetch }),
      ]).then(
        ([record, { responses }]) =>
          (data = {
            locations: data.locations || [],
            ...data,
            eventId,
            responses,
            record,
          })
      )
    )
  );

  const handleGroupBy = (g) => () => {
    groupBy = g;
  };

  const downloadCSV = () => {
    downloadBlob(
      arrayToCSV(responsesToArray($locale, data.record, data.responses)),
      "export.csv",
      "text/csv;charset=utf-8;"
    );
  };
</script>

<div class="mb-4 flex w-full justify-between">
  <Button
    >{$t("event.results.group_by")}
    <ChevronDownOutline
      class="dark:text-primary ms-2 h-6 w-6 text-white"
    /></Button
  >
  <Dropdown simple>
    <DropdownItem onclick={handleGroupBy("user")}
      >{$t("event.results.group_by_user")}</DropdownItem
    >
    <DropdownItem onclick={handleGroupBy("slot")}
      >{$t("event.results.group_by_slot")}</DropdownItem
    >
  </Dropdown>

  {#if groupBy === "slot"}
    <Button outline class="ms-2"
      >{$t("act.show")}
      <ChevronDownOutline
        class="dark:text-primary ms-2 h-6 w-6 text-white"
      /></Button
    >
    <Dropdown simple>
      {#each data.record?.questions || [] as q}
        {#if q.answer_type !== "just_text"}
          <DropdownItem>
            <Toggle
              bind:checked={secondaryGroups[q.id]}
              class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >{stripTags(q.label).slice(0, 30)}</Toggle
            >
          </DropdownItem>
        {/if}
      {/each}
    </Dropdown>
  {/if}

  <Button class="ml-auto"
    >{$t("act.download")}
    <ChevronDownOutline
      class="ms-2 h-6 w-6 text-white dark:text-white"
    /></Button
  >
  <Dropdown simple>
    <DropdownItem onclick={downloadCSV}>as CSV</DropdownItem>
  </Dropdown>
</div>

{#if groupBy === "user"}
  <EventResponsesTableByUser
    event={data.record}
    responses={data.responses as UserBookingResponse[]}
  />
{:else if groupBy === "slot"}
  <EventResponsesTableBySlot
    event={data.record}
    responses={data.responses as UserBookingResponse[]}
    secondaryGroups={Object.entries(secondaryGroups)
      .filter(([q, toggled]) => toggled)
      .map(([q]) => q)}
  />
{/if}
