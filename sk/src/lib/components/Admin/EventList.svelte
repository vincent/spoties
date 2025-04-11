<script lang="ts">
    import { Timeline, TimelineItem } from "flowbite-svelte";

    let { events } = $props()
</script>

<Timeline>
    {#each $events.items as item}
      <a href={`/admin/events/${item.id}`}>
        <TimelineItem
          title={item.title}
          date={new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date(item.updated))}
          classLi="hover:bg-gray-100 p-2"
        >
          <div class="mb-4 flex justify-between text-base font-normal text-gray-500 dark:text-gray-400">
            <p>{"An event about blh bazd dazd dazd azd"}</p>
            <div class="event-actions">
            </div>
          </div>
        </TimelineItem>
      </a>
    {:else}
      <div>No event found. Create some !</div>
    {/each}
  </Timeline>
  