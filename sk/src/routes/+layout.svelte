<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Nav from "$lib/components/Nav/Nav.svelte";

  const { data, children } = $props();
  const metadata = $derived(data.metadata ?? {});
  const config = $derived(data.config ?? {});

  $effect(() => {
    if ($page.error) metadata.title = $page.error.message;
  });
</script>

<svelte:head>
  <title>{metadata.title} | {config.site?.name}</title>
</svelte:head>

<div class="bg-gray-50 antialiased dark:bg-gray-900">
  <Nav siteName={config.site?.name} siteLogo={null} />

  {@render children()}
</div>
