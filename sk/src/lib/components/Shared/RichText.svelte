<script lang="ts">
	import "@friendofsvelte/tipex/styles/Tipex.css";
	import "@friendofsvelte/tipex/styles/ProseMirror.css";
	import "@friendofsvelte/tipex/styles/Controls.css";
	import "@friendofsvelte/tipex/styles/EditLink.css";
	import "@friendofsvelte/tipex/styles/CodeBlock.css";
	import { Tipex } from '@friendofsvelte/tipex';

	let {
		value = $bindable(),
		size = 50,
		onblur = () => null,
	} = $props()

	let tipex = $state<Tipex>();
</script>

<Tipex
	body={value}
	bind:tipex
	controls !focal
	class="h-[{size}vh] border border-neutral-200"
	onblur={onblur?.()}
	onupdate={() => value = tipex?.getHTML()}
>
	{#snippet utilities(tipex)}
	{/snippet}
</Tipex>

<style>
	:global(.tipex-button-rigid) {
		height: 1.8rem;
		width: 1.9rem;
	}
</style>