<script lang="ts">
	import "@friendofsvelte/tipex/styles/Tipex.css";
	import "@friendofsvelte/tipex/styles/ProseMirror.css";
	import "@friendofsvelte/tipex/styles/Controls.css";
	import "@friendofsvelte/tipex/styles/EditLink.css";
	import "@friendofsvelte/tipex/styles/CodeBlock.css";
	import { Tipex } from '@friendofsvelte/tipex';
    import { stripTags } from "$lib/i18n";

	// https://github.com/themesberg/flowbite-svelte/blob/main/src/lib/forms/FloatingLabelInput.svelte
	const inputColorClasses = {
		base: 'border-gray-300 dark:border-gray-600 dark:focus:border-primary-500 focus:border-primary-600',
		green: 'border-green-600 dark:border-green-500 dark:focus:border-green-500 focus:border-green-600',
		red: 'border-red-600 dark:border-red-500 dark:focus:border-red-500  focus:border-red-600'
	};

	let {
		value = $bindable(),
		disabled = false,
		size = 50,
		color = 'base',
	} = $props()

	let tipex = $state<Tipex>();

	function getHTML() {
		const html = (tipex as any)?.getHTML()
		const clean = stripTags(html);
		return clean ? html : ''
	}
</script>

{#if !disabled}
	<Tipex
		body={value}
		bind:tipex={tipex as any}
		controls !focal
		class="h-[{size}vh] border border-neutral-200 bg-white dark:bg-gray-800 {inputColorClasses[color]}"
		onupdate={() => value = getHTML()}
	>
		{#snippet utilities(tipex)}
		{/snippet}
	</Tipex>
{/if}

<style>
	:global(.tipex-button-rigid) {
		height: 1.8rem;
		width: 1.9rem;
	}
</style>