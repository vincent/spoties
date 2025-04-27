<script lang="ts">
  import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
  import { Navbar, NavLi, NavUl } from "flowbite-svelte";
  import { page } from "$app/state";
  import { t } from "$lib/i18n/index.js";

  const activeClass = 'rounded-none md:border-b-2 border-primary-600 dark:border-primary-500 text-primary-700';
  const { data, children } = $props();
  let activeUrl = $derived(page.url.pathname)
  AdminEventStore.set(data.record)
</script>

<div class="w-full max-w-(--breakpoint-2xl) mx-auto">
  <Navbar class="mb-5" navContainerClass="flex justify-center">
    <NavUl {activeUrl} ulClass="flex flex-col p-4 pb-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
      <NavLi {activeClass} href={`/admin/events/${data.eventId}/`}>{$t('menu.form')}</NavLi>
      <NavLi {activeClass} href={`/admin/events/${data.eventId}/responses/`}>{$t('menu.responses')}</NavLi>
      <NavLi {activeClass} href={`/admin/events/${data.eventId}/releases/`}>{$t('menu.press')}</NavLi>
    </NavUl>
  </Navbar>

  {@render children()}
</div>