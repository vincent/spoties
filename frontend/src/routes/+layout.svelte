<script lang="ts">
  import "../app.styles.admin.css";
  import { page } from "$app/stores";
  import Footer from "$lib/components/Nav/Footer.svelte";

  const { data, children } = $props();
  const metadata = $derived(data.metadata ?? {});
  const {
    name: siteName,
    url: siteUrl,
    logo: siteLogo,
  } = $derived(data.config.site ?? {});

  $effect(() => {
    if ($page.error) metadata.title = $page.error.message;
  });
</script>

<svelte:head>
  <title>{metadata.title} | {siteName}</title>
</svelte:head>

{@render children()}

<Footer {siteName} {siteUrl} />
