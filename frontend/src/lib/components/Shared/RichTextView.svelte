<script lang="ts">
  let { html } = $props();
</script>

<span class="richtext-view text-gray-800 dark:text-gray-100">
  {@html html}
</span>

<style>
  :global(.richtext-view p) {
    margin-bottom: 0.5rem;
  }
</style>
