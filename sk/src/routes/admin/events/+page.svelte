<script lang="ts">
  import { PlusOutline } from "flowbite-svelte-icons";
  import { Button, Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
  import EventList from "$lib/components/Admin/EventList.svelte";
  import { t } from "$lib/i18n/index.js";

  const { data } = $props();
</script>

<div class="w-full px-3 max-w-(--breakpoint-2xl) mx-auto bg-white dark:bg-gray-800">
  <Navbar fluid>
    <NavBrand href="/admin/events/create">
      <Button><PlusOutline /> {$t('homepage.staff_new_event')}</Button>
    </NavBrand>
    <NavUl>
      <NavLi href="/admin/events">All</NavLi>
      <NavLi href="/admin/events/future">Coming up</NavLi>
      <NavLi href="/admin/events/past">Passed</NavLi>
    </NavUl>
  </Navbar>

  <EventList events={data.events} />
</div>
