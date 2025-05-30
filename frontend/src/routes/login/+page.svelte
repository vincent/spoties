<script>
  import { page } from "$app/stores";
  import LoginForm from "$lib/components/Auth/LoginForm.svelte";
  const { data } = $props();
  const siteName = $derived(data?.config?.site?.name ?? "Site name");
  let returnUrl = $page.url.searchParams.get("return_url") ?? undefined;
</script>

<main class="p-4 pt-20">
  <LoginForm {returnUrl} {siteName} />
</main>
