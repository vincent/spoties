<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { slide } from 'svelte/transition';
	import { stripTags, t } from "$lib/i18n";
	
  let { event, responses } = $props() 
  let openRow = $state(-1)

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
        <TableHeadCell>{new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date(response.updated))}</TableHeadCell>
        <TableHeadCell>{response.user.name}</TableHeadCell>
        {#each event.locations as l}
          {#each l.slots as s}
            <TableHeadCell>{response.bookings.includes(s.id) ? $t('data.yes') : ''}</TableHeadCell>
          {/each}
        {/each}
      </TableBodyRow>
      {#if openRow === i}
        <TableBodyRow>
          <TableBodyCell colspan={2 + 4} class="p-6">
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
