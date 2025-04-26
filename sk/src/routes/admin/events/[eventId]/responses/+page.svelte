<script lang="ts">
  import EventResponsesTableByUser from "$lib/components/Admin/Events/EventResponsesTableByUser.svelte";
  import EventResponsesTableBySlot from "$lib/components/Admin/Events/EventResponsesTableBySlot.svelte";
  import { arrayToCSV, responsesToArray, downloadBlob } from "$lib/utils/csv";
  import { Button, Dropdown, DropdownItem, Toggle } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { locale, t } from "$lib/i18n";

  const { data } = $props()
  let showOpen = $state(false)
  let groupOpen = $state(false)
  let downloadOpen = $state(false)

  let groupBy = $state('user')

  let secondaryGroups = $state<Record<string, boolean>>({})

  const handleGroupBy = g => _ => {
    groupOpen = false
    groupBy = g
  }

  const downloadCSV = () => {
    downloadOpen = false
    downloadBlob(
      arrayToCSV(responsesToArray($locale, data.record, data.responses)),
      'export.csv', 'text/csv;charset=utf-8;'
    )
  }
</script>

<div class="w-full mb-4 flex justify-between">
  <Button>{$t('event.results.group_by')} <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
  <Dropdown bind:open={groupOpen}>
    <DropdownItem onclick={handleGroupBy('user')}>{$t('event.results.group_by_user')}</DropdownItem>
    <DropdownItem onclick={handleGroupBy('slot')}>{$t('event.results.group_by_slot')}</DropdownItem>
  </Dropdown>

  {#if groupBy === 'slot'}
    <Button outline class="ms-2" >{$t('act.show')} <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
    <Dropdown bind:open={showOpen}>
      {#each data.record.questions as q}
        {#if q.answer_type !== 'just_text'}
          <DropdownItem>
            <Toggle bind:checked={secondaryGroups[q.id]} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">{q.label}</Toggle>
          </DropdownItem>
        {/if}
      {/each}
    </Dropdown>
  {/if}

  <Button class="ml-auto">{$t('act.download')} <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
  <Dropdown bind:open={downloadOpen}>
    <DropdownItem onclick={downloadCSV}>as CSV</DropdownItem>
  </Dropdown>
</div>

{#if groupBy === 'user'}
  <EventResponsesTableByUser event={data.record} responses={data.responses} />
{:else if groupBy === 'slot'}
  <EventResponsesTableBySlot event={data.record} responses={data.responses} secondaryGroups={Object.entries(secondaryGroups).filter(([q, toggled]) => toggled).map(([q]) => q)} />
{/if}
