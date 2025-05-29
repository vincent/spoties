<script>
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { Alert } from "flowbite-svelte";
  import { t } from "$lib/i18n";
  let { text } = $props();
</script>

<Alert border class="my-5" color="orange">
  {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
  <span class="font-medium">Oops!</span>
  {$t(text)}
</Alert>
