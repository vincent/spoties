<script lang="ts">
  import Nav from "$lib/components/Nav/Nav.svelte";
  const { data, children } = $props();
  const config = $derived(data.config ?? {});
</script>

<div class="min-h-screen bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo="/spoties_logo.svg" />

  <main class="h-auto px-4 flex">
    {@render children()}
  </main>
</div>

<style>
</style>