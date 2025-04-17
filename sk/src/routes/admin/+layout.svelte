<script lang="ts">
  import Nav from "$lib/components/Nav/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  const { data, children } = $props();
  const config = $derived(data.config ?? {});
</script>

<div class="bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo={null} />

  <main class="h-auto p-4 pt-20 flex">
    <Sidebar />
    {@render children()}
  </main>
</div>
