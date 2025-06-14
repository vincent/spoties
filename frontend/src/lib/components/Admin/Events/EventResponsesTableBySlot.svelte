<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Tooltip,
  } from "flowbite-svelte";
  import { slide } from "svelte/transition";
  import { stripTags, t } from "$lib/i18n";
  import { BadgeCheckIcon } from "lucide-svelte";
  import UserName from "$lib/components/Shared/UserName.svelte";

  let { event, responses, secondaryGroups } = $props();
  let slotsOccupation = $derived(
    event.locations
      .flatMap((l) => l.slots)
      .reduce(
        (acc, slot) => ({
          ...acc,
          [slot.id]: {
            ...slot,
            bookedBy: responses.reduce(
              (acc, r) =>
                acc.concat(
                  !acc.find((r2) => r2.user.id === r.user.id)
                    ? r.bookings.includes(slot.id)
                      ? r
                      : []
                    : []
                ),
              []
            ),
          },
        }),
        {}
      )
  );

  $inspect(slotsOccupation);

  let openRow = $state(-1);
  const toggleRow = (i) => {
    openRow = openRow === i ? null : i;
  };
</script>

<Table>
  <TableHead>
    <TableHeadCell>{$t("event.form.locations")}</TableHeadCell>
    <TableHeadCell>{"participants"}</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    {#each event.locations as l}
      {#each l.slots as s}
        <TableBodyRow onclick={() => toggleRow(s)}>
          <TableBodyCell class="py-3 align-top">
            {stripTags(l.name)}
            <div class="text-xs">- {stripTags(s.label)}</div></TableBodyCell
          >

          <TableBodyCell class="py-3 font-medium whitespace-nowrap">
            {#if slotsOccupation[s.id]?.bookedBy}
              <Table>
                <TableHead class="hidden">
                  <TableHeadCell>{"Email"}</TableHeadCell>
                  {#if secondaryGroups?.length}
                    {#each secondaryGroups as q}
                      <TableHeadCell>{q.label}</TableHeadCell>
                    {/each}
                  {/if}
                </TableHead>
                <TableBody class="divide-y">
                  {#each slotsOccupation[s.id].bookedBy as r}
                    <TableBodyRow class="border-0">
                      <TableBodyCell class="w-50 p-1">
                        <UserName
                          user={r.user as any}
                          confirmed={r.confirmed}
                        />
                      </TableBodyCell>
                      {#if secondaryGroups?.length}
                        {#each secondaryGroups as qid}
                          <TableBodyCell>{r.answers[qid]}</TableBodyCell>
                        {/each}
                      {/if}
                      <TableBodyCell class="filler"></TableBodyCell>
                    </TableBodyRow>
                  {/each}
                </TableBody>
              </Table>
            {/if}
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    {/each}
  </TableBody>
</Table>

<style>
  :global(td:not(.filler)) {
    width: 200px;
  }
</style>
