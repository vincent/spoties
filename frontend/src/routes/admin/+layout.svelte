<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Nav from "$lib/components/Nav/Nav.svelte";

  const { data, children } = $props();
  const config = $derived(data.config ?? {});
</script>

<div class="min-h-screen bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo="/spoties_logo.png" />

  <main class="h-auto pe-4 md:pl-4 pt-14 flex">
    <Sidebar />
    {@render children()}
  </main>
</div>

<style>
</style>