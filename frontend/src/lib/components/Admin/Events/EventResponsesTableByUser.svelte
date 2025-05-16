<script lang="ts">
  import { Button, Dropdown, DropdownItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip } from 'flowbite-svelte';
  import type { UserBookingResponse } from '$lib/pocketbase/types';
  import { BadgeCheckIcon, CircleCheckIcon } from 'lucide-svelte';
  import { formatDate } from '$lib/utils/dates.svelte';
  import { slide } from 'svelte/transition';
	import { stripTags, t } from "$lib/i18n";
  import { client } from '$lib/pocketbase';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

  let {
    event,
    responses
  }: {
    event,
    responses: UserBookingResponse[]
  } = $props()

  let openRow = $state(-1)
  let slotSpan = $derived(event.locations.reduce((acc, l) => acc + l.slots.length, 0))

  const toMap = (slots: string[]) => (slots || []).reduce((acc, s) => ({
      ...acc, [s]: true
    }), {})

  let manualBookingLoading = $state(false)
  const newManualBooking = (index) => ({
    notify: true,
    pristine: true,
    id: responses[index]?.id || null,
    slots: toMap(responses[index]?.bookings)
  })
  let manualBookings = $state(newManualBooking(-1))

  const toggleRow = index => {
    manualBookings = newManualBooking(index)
    openRow = openRow === index ? -1 : index
  }

  const toggleBookingSlot = (slot) => {
    const wasSelected = !!manualBookings.slots[slot.id]
    const without = toMap(Object.keys(manualBookings.slots).filter(s => s !== slot.id))
    manualBookings = {
      ...manualBookings,
      pristine: false,
      slots: wasSelected ? without : { ...without, [slot.id]: true }
    }
  }

  const saveManualBooking = (body) => Promise.resolve()
    .then(_ => manualBookingLoading = true)
    .then(_ => client
      .send(`/api/admin/events/${event.id}/saveManualBooking`, { method: 'post', body: { ...manualBookings, ...body } })
      .then(async () => {
        manualBookingLoading = false
        openRow = -1
      })
    )
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
  <TableBody class="divide-y">
    {#each responses as response, i}
      <TableBodyRow onclick={() => toggleRow(i)}>
        <TableHeadCell class="whitespace-nowrap">{formatDate(new Date(response.updated))}</TableHeadCell>
        <TableHeadCell>
          <span class="flex gap-1">{response.user.name} {#if response.confirmed}<BadgeCheckIcon size={16} class="text-green-700" /><Tooltip>{$t('act.confirmed')}</Tooltip>{/if}</span>
        </TableHeadCell>
        {#each event.locations as l}
          {#each l.slots as s}
            <TableHeadCell>
              {#if openRow === i}
                <CircleCheckIcon
                  class="hover:opacity-100
                    {manualBookingLoading ? 'pointer-events-none' : ''}
                    {response.bookings.includes(s.id) ? 'text-primary-700' : 'text-grey-300 dark:text-primary-100'}
                    {manualBookings.slots[s.id] ? '' : 'opacity-20 dark:opacity-10'}
                  "
                  onclick={e => (e.stopPropagation() as any) || (e.preventDefault() as any) || toggleBookingSlot(s)}
                />
                <Tooltip>{$t((response.bookings.includes(s.id) || manualBookings.slots[s.id]) ? 'act.remove' : 'act.add')}</Tooltip>
              {:else if (response.bookings.includes(s.id))}
                <CircleCheckIcon class="text-primary-700"/>
              {/if}
            </TableHeadCell>
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
              <div class="text-end">
                <Button
                  outline={manualBookings.pristine}
                  disabled={manualBookingLoading || manualBookings.pristine}
                >{$t('event.results.save_slots_selection')} <ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-primary" /></Button>
                <Dropdown simple>
                  <DropdownItem onclick={() => saveManualBooking({ notify: true })}>{$t('event.results.save_slots_selection_with_notify')}</DropdownItem>
                  <DropdownItem onclick={() => saveManualBooking({ notify: false })}>{$t('event.results.save_slots_selection_without_notify')}</DropdownItem>
                </Dropdown>
              </div>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
