<script lang="ts">
  import Nav from "$lib/components/Nav/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { Modals } from "svelte-modals";

  const { data, children } = $props();
  const config = $derived(data.config ?? {});
</script>

<div class="min-h-screen bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo="/spoties_logo.png" />

  <main class="h-auto p-4 pt-14 flex">
    <Sidebar />
    {@render children()}
  </main>
</div>

<Modals />