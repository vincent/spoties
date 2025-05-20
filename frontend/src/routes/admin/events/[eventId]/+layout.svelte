<script lang="ts">
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  import { Navbar, NavLi, NavUl } from "flowbite-svelte";
  import { t } from "$lib/i18n/index.js";
  import { page } from "$app/state";

  const activeClass = 'rounded-none md:border-b-2 border-primary-600 text-primary-600';
  const { data, children } = $props();
  let activeUrl = $derived(page.url.pathname)
  debugger;
  page.url.pathname.match(/\/stored/)
    ? AdminEventStore.loadFromStorage()
    : AdminEventStore.reset(data.record as any)
</script>

<div class="w-full max-w-(--breakpoint-2xl) mx-auto">
  <Navbar class="mb-5" navContainerClass="flex justify-center">
    <NavUl {activeUrl} ulClass="flex flex-col p-4 pb-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
      {#if data.eventId !== 'create'}
        <NavLi {activeClass} href={`/admin/events/${data.eventId}/`}>{$t('menu.form')}</NavLi>
        <NavLi {activeClass} href={`/admin/events/${data.eventId}/responses/`}>{$t('menu.responses')}</NavLi>
        <NavLi {activeClass} href={`/admin/events/${data.eventId}/releases/`}>{$t('menu.press')}</NavLi>
      {/if}
    </NavUl>
  </Navbar>

  {@render children()}
</div>