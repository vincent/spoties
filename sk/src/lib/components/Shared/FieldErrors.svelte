<script lang="ts">
  import { Helper } from "flowbite-svelte";
  let { validationErrors } = $props()
</script>

<!-- <pre>{JSON.stringify(validationErrors)}</pre> -->
{#if validationErrors}
  <Helper class="mt-2" color="red">
    {#each validationErrors as error}
      {error.message}
    {/each}
  </Helper>
{/if}
