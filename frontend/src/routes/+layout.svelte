<script lang="ts">
  import "../app.styles.admin.css";
  import { page } from "$app/stores";

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

{@render children()}
