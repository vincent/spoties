<script lang="ts">
  import { MapPinHouseIcon } from "lucide-svelte";
  const { siteName, siteLogo } = $props();
</script>

<a href="/" class="flex items-center justify-between mr-4">
  <MapPinHouseIcon class="text-gray-600 dark:text-gray-200 mr-2" />
  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteName}</span>
</a>
