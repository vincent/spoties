<script lang="ts">
  const { siteName, siteLogo } = $props();
</script>

<a href="/" class="mr-4 flex items-center justify-between">
  <img src={siteLogo} class="mr-3 h-8" alt="Logo" />
  <span
    class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
    >{siteName}</span
  >
</a>
