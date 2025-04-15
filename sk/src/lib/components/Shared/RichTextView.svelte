<script lang="ts">
	let { html } = $props()
</script>

<span class="richtext-view">
	{@html html}
</span>

<style>
	:global(.richtext-view p) {
		margin-bottom: 0.5rem;
	}
</style>