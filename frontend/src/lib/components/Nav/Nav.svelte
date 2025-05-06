<script lang="ts">
  import LoginBadge from "../Auth/LoginBadge.svelte";
  import NavDrawer from "./NavDrawer.svelte";
  import NavApp from "./NavApp.svelte";
  import NavSearch from "./NavSearch.svelte";
  import Language from "./Language.svelte";
  import { DarkMode } from "flowbite-svelte";

  const { siteName, siteLogo } = $props();
</script>

<nav class="bg-white border-b border-gray-200 px-4 py-2 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
  <div class="flex flex-wrap justify-between items-center">
    <div class="flex justify-start items-center">
      <NavDrawer />
      <NavApp siteName={siteName} siteLogo={siteLogo} />
      <!-- <NavSearch /> -->
    </div>

    <div class="flex items-center lg:order-2">
      <!-- <NavNotifications /> -->
      <!-- <NavApps /> -->
      <Language />
      <DarkMode />  
      <LoginBadge />
    </div>
  </div>
</nav>
