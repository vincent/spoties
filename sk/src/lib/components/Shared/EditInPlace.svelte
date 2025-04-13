<script lang="ts">
    import { Input, Textarea } from "flowbite-svelte";

	let {
		value = $bindable(),
		placeholder = '',
		input = 'input', // | textarea
		divClass,
		children,
	} = $props()

	let editing = $state(false)
	let element = $state()
	let original = value;

	function edit() {
		editing = true;
		setTimeout(() => (element as any)?.element?.focus(), 10)
	}

	function keydown(event: KeyboardEvent) {
		if (event.key == "Escape") {
			event.preventDefault();
			value = original;
			editing = false;
		}
	}
</script>

<div class={divClass}>
	{#if editing && input === 'input'}
		<Input bind:this={element} {placeholder} on:keydown={keydown} onblur={() => editing = false} bind:value={value} />

	{:else if editing && input === 'textarea'}
		<Textarea bind:this={element} {placeholder} on:keydown={keydown} onblur={() => editing = false} bind:value={value} />

	{:else}
		<div onclick={edit}>
			{@render children()}
		</div>
	{/if}
</div>