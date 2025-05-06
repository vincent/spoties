<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { slide } from 'svelte/transition';
	import { stripTags, t } from "$lib/i18n";
  import { formatDate } from '$lib/utils/dates.svelte';
  import type { UserBookingResponse } from '$lib/pocketbase/types';
    import { BadgeCheckIcon } from 'lucide-svelte';
	
  let {
    event,
    responses
  }: {
    event,
    responses: UserBookingResponse[]
  } = $props()

  let openRow = $state(-1)
  let slotSpan = $derived(event.locations.reduce((acc, l) => acc + l.slots.length, 0))

  const toggleRow = (i) => {
    openRow = openRow === i ? null : i
  }
</script>

<Table>
  <TableHead>
    <TableHeadCell>{$t('data.date')}</TableHeadCell>
    <TableHeadCell>{$t('data.email')}</TableHeadCell>
    {#each event.locations as l}
      {#each l.slots as s}
        <TableHeadCell>
          <div>{stripTags(l.name)}</div>
          <div class="text-xs"> - {stripTags(s.label)}</div>
        </TableHeadCell>
      {/each}
    {/each}
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each responses as response, i}
      <TableBodyRow on:click={() => toggleRow(i)}>
        <TableHeadCell>{formatDate(new Date(response.updated))}</TableHeadCell>
        <TableHeadCell>
          <span class="flex gap-1">{response.user.name} {#if response.confirmed}<BadgeCheckIcon size={16} class="text-primary-700" />{/if}</span>
        </TableHeadCell>
        {#each event.locations as l}
          {#each l.slots as s}
            <TableHeadCell>{response.bookings.includes(s.id) ? $t('data.yes') : ''}</TableHeadCell>
          {/each}
        {/each}
      </TableBodyRow>
      {#if openRow === i}
        <TableBodyRow>
          <TableBodyCell colspan={2 + slotSpan} class="p-6">
            <div class="grid pt-8 text-left md:gap-16 dark:border-gray-700 md:grid-cols-2" transition:slide={{ duration: 300, axis: 'y' }}>
              <div>
                {#each event.questions as q}
                  {#if q.answer_type !== 'just_text'}
                    <div class="mb-10">
                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          {stripTags(q.label)}
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400">
                          {response.answers[q.id]}
                        </p>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
