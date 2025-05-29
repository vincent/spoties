<script lang="ts">
  import LoginBadge from "../Auth/LoginBadge.svelte";
  import NavDrawer from "./NavDrawer.svelte";
  import NavApp from "./NavApp.svelte";
  import NavSearch from "./NavSearch.svelte";
  import Language from "./Language.svelte";
  import {
    DarkMode,
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
  } from "flowbite-svelte";

  const { siteName, siteLogo } = $props();
</script>

<Navbar>
  <NavBrand href="/">
    <img src={siteLogo} class="me-3 h-6 sm:h-9" alt={siteName} />
    <span
      class="self-center pb-1 text-xl font-semibold whitespace-nowrap dark:text-white"
      >{siteName}</span
    >
  </NavBrand>
  <NavHamburger />

  <div class="mr-auto">
    <NavUl>
      <NavLi href="/admin/events/list">Events</NavLi>
    </NavUl>
  </div>

  <Language />
  <DarkMode />
  <LoginBadge />
</Navbar>
