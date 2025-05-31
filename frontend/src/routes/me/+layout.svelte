<script lang="ts">
  import Nav from "$lib/components/Nav/Nav.svelte";
  const { data, children } = $props();
  const { name: siteName, logo: siteLogo } = $derived(data.config.site ?? {});
</script>

<div class="min-h-screen bg-gray-50 antialiased dark:bg-gray-900">
  <Nav {siteName} {siteLogo} />

  <main class="h-min-[800px] flex h-auto px-4">
    {@render children()}
  </main>
</div>
