<script lang="ts">
  import { PlusOutline } from "flowbite-svelte-icons";
  import { Button, Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
  import EventList from "$lib/components/Admin/EventList.svelte";

  const { data } = $props();
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl)">
  <Navbar fluid class="ml-3">
    <NavBrand href="/admin/events/create">
      <Button><PlusOutline /> Create a new event</Button>
    </NavBrand>
    <NavUl>
      <NavLi href="/admin/events">All</NavLi>
      <NavLi href="/admin/events/future">Coming up</NavLi>
      <NavLi href="/admin/events/past">Passed</NavLi>
    </NavUl>
  </Navbar>

  <EventList events={data.events} />
</div>
