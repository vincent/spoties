<script lang="ts">
	import { DarkMode } from "flowbite-svelte";
	let { children } = $props()
</script>

<nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
	<div class="flex justify-between items-start">
		<span>{@render children()}</span>
		<DarkMode />
	</div>
</nav>
