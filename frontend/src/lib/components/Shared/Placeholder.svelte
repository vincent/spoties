<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        value,
        empty,
        children,
    }: {
        value: string,
        empty: string,
        children?: Snippet<[]>;
    } = $props()
</script>
{#if value}
    {@html value}
{:else}
    <em>{empty}</em>
    {@render children?.()}
{/if}