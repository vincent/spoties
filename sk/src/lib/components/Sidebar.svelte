<script>
  import { page } from "$app/stores";
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import {
    ChartPieSolid,
    GridSolid,
    MailBoxSolid,
    UserSolid,
    ArrowRightToBracketOutline,
    EditOutline,
  } from "flowbite-svelte-icons";
  let spanClass = "flex-1 ms-3 whitespace-nowrap";
  let open = $state(false)
</script>

<Sidebar activeUrl={$page.url.pathname} class="top-20 w-50 z-40 sticky top-18 h-screen transition-transform -translate-x-full md:translate-x-0 {open ? 'open' : 'closed'}">
  <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Events" href="/admin/events">
            <svelte:fragment slot="icon">
            <ChartPieSolid
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Kanban" {spanClass}>
            <svelte:fragment slot="icon">
            <GridSolid
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Inbox" {spanClass}>
            <svelte:fragment slot="icon">
            <MailBoxSolid
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
            <span
                class="text-primary-600 bg-primary-200 dark:bg-primary-900 dark:text-primary-200 ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full p-3 text-sm font-medium"
            >
                3
            </span>
            </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sidebar" href="/docs/components/sidebar">
            <svelte:fragment slot="icon">
            <UserSolid
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sign In">
            <svelte:fragment slot="icon">
            <ArrowRightToBracketOutline
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sign Up">
            <svelte:fragment slot="icon">
            <EditOutline
                class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            />
            </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
