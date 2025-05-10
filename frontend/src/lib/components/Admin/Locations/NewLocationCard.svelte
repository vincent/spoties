<script>
  import { t } from "$lib/i18n";
  import { Card } from "flowbite-svelte";
  let { onclick } = $props();
</script>

<Card class="hover:bg-gray-100 dark:hover:bg-gray-600 p-3">
  <button type="button" {onclick}>
    <div class="text-center text-8xl text-gray-400">+</div>
    <div class="text-center text-2xl text-gray-400">{$t('event.form.new_location')}</div>
  </button>
</Card>
