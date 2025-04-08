<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  const { data, children } = $props();
  const config = $derived(data.config ?? {});
</script>

<div class="bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo={null} />

  <Sidebar />

  <main class="h-auto p-4 pt-20 md:ml-64">
    {@render children()}
  </main>
</div>
