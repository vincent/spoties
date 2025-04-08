<script lang="ts">
    const { siteName, siteLogo } = $props();
</script>

<a href="/" class="flex items-center justify-between mr-4">
    <img
      src={siteLogo}
      class="mr-3 h-8"
      alt="Flowbite Logo"
    />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteName}</span>
</a>
