<script lang="ts">
  import { base } from "$app/paths";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { Timeline, TimelineItem, Button, Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";

  const { data } = $props();
  const events = $derived(data.events);
  $effect(() => {
    data.metadata.title = data.metadata.headline = "Events";
  });
</script>

<Navbar class="ml-3">
  <NavBrand href="/admin/events/create">
    <Button><PlusOutline /> Create a new event</Button>
  </NavBrand>
  <NavUl>
    <NavLi href="/admin/events">All</NavLi>
    <NavLi  href="/admin/events/future">Coming up</NavLi>
    <NavLi  href="/admin/events/past">Passed</NavLi>
  </NavUl>
</Navbar>

<Timeline>
  {#each $events.items as item}
    <a href={`${base}/admin/events/${item.id}`}>
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
