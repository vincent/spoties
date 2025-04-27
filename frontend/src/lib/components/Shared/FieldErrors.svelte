<script lang="ts">
  import { Helper } from "flowbite-svelte";
  let { validationErrors } = $props()
</script>

<!-- <pre>{JSON.stringify(validationErrors)}</pre> -->
{#if validationErrors}
  <Helper class="mt-2 text-primary-600 dark:text-primary-500">
    {#each validationErrors as error}
      {error.message}
    {/each}
  </Helper>
{/if}
