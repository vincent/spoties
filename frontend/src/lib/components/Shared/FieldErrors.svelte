<script lang="ts">
  import { Helper } from "flowbite-svelte";
  let { validationErrors, helperClass = "" } = $props();
</script>

<!-- <pre>{JSON.stringify(validationErrors)}</pre> -->
{#if validationErrors}
  <Helper class="text-primary-600 dark:text-primary-500 mt-2 {helperClass}">
    {#each validationErrors as error}
      {error.message}
    {/each}
  </Helper>
{/if}
