<script>
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from "flowbite-svelte";
  import { Calendar1 } from "lucide-svelte";
  import { page } from "$app/stores";
  let open = $state(false)
</script>

<Sidebar activeUrl={$page.url.pathname} class="top-20 w-50 z-40 sticky top-18 h-screen transition-transform -translate-x-full md:translate-x-0 {open ? 'open' : 'closed'}">
  <SidebarWrapper>
    <SidebarGroup>
    <SidebarItem label="Events" href="/admin/events">
      <svelte:fragment slot="icon">
      <Calendar1 class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
      </svelte:fragment>
    </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
