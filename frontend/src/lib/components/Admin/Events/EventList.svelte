<script lang="ts">
  import type { EventsResponse } from "$lib/pocketbase/generated-types";
  import { FilePenOutline, LockOutline } from "flowbite-svelte-icons";
  import { Label, Timeline, TimelineItem } from "flowbite-svelte"; 
  import { formatDate } from "$lib/utils/dates.svelte";
  import type { PageStore } from "$lib/pocketbase";
  import { stripTags, t } from "$lib/i18n";

  let { events }: { events: PageStore<EventsResponse<any>> } = $props()
</script>

{#if $events.items?.length}
  <Timeline class="mt-3 ms-3">
    {#each $events.items as item}
      <a href={`/admin/events/${item.id}`}>
        <TimelineItem
          title={item.title}
          date={formatDate(new Date(Date.parse(item.updated)))}
          liClass="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 transition-colors duration-200"
        >
          <div class="mb-4 flex justify-between text-base font-normal text-gray-500 dark:text-gray-400">
            <p>{stripTags(item.description).slice(0, 100)}</p>
            <div class="flex flex-col">
              <span class="flex justify-end text-primary-700">{#if !item.published}<FilePenOutline />{/if}{#if item.sealed}<LockOutline />{/if}</span>
              <span>{$t('event.locations', { count: (item.expand?.locations_via_event?.length || 0) })}</span>
              <span>{$t('event.bookings', { count: (item.expand?.bookings_via_event?.length || 0) })}</span>
            </div>
          </div>
        </TimelineItem>
      </a>
    {/each}
  </Timeline>
{:else}
  <Label class="ps-4">{$t('event.empty_list')}</Label>
{/if}
