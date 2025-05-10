<script>
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from "flowbite-svelte";
  import { Calendar1 } from "lucide-svelte";
  import { page } from "$app/stores";
  import { t } from "$lib/i18n";
  let open = $state(true)
</script>

<Sidebar activeUrl={$page.url.pathname} class="w-40 z-40 sticky top-14 me-5 h-screen transition-transform -translate-x-full md:translate-x-0 {open ? 'open' : 'closed'}">
  <SidebarWrapper>
    <SidebarGroup>
    <SidebarItem label={$t('menu.events')} href="/admin/events">
      {#snippet icon()}
        <Calendar1 class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
      {/snippet}
    </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
