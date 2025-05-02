<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte"; 
  import { formatDate } from "$lib/utils/dates.svelte";
  import { stripTags, t } from "$lib/i18n";
  let { events } = $props()
</script>

<Timeline class="mt-3 ms-3">
  {#each $events.items as item}
    <a href={`/admin/events/${item.id}`}>
      <TimelineItem
        title={item.title}
        date={formatDate(item.updated)}
        classLi="hover:bg-gray-100 dark:hover:bg-gray-600 p-2"
      >
        <div class="mb-4 flex justify-between text-base font-normal text-gray-500 dark:text-gray-400">
          <p>{stripTags(item.description).slice(0, 100)}</p>
          <div class="flex flex-col">
            <span>{$t('event.locations', { count: (item.expand?.locations_via_event?.length || 0) })}</span>
            <span>{$t('event.bookings', { count: (item.expand?.bookings_via_event?.length || 0) })}</span>
          </div>
        </div>
      </TimelineItem>
    </a>
  {:else}
    <div>{$t('event.empty_list')}</div>
  {/each}
</Timeline>
  