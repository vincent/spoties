<script lang="ts">
	import { DarkMode } from "flowbite-svelte";
    import Language from "./Language.svelte";
    import type { Snippet } from "svelte";
	let { children }: { children?: Snippet } = $props()
</script>

<nav class="bg-white border-b border-gray-200 px-4 py-2 dark:bg-gray-800 dark:border-gray-700">
	<div class="flex justify-between items-start">
		<div class="mr-auto">{@render children?.()}</div>
		<Language />
		<DarkMode />
	</div>
</nav>
