<script lang="ts">
  import { clickOutside } from "$lib/utils/click-outside";
  import GeoLocationSearch from "./GeoLocationSearch.svelte";
  import { PUBLIC_GOOGLE_MAPS_API_KEY } from "$env/static/public";
  import RichText from "./RichText.svelte";
  import { Input } from "flowbite-svelte";
  import type { Snippet } from "svelte";

  let {
    value = $bindable(),
    altValue = $bindable(),
    placeholder = "",
    input = "input", // | richtext
    divClass = "",
    children,
  }: {
    value?: string | undefined;
    altValue?: string | undefined;
    placeholder?: string | undefined;
    input?: "input" | "richtext" | "geo";
    divClass?: string | undefined;
    children: Snippet;
  } = $props();

  let editing = $state(false);
  let element = $state();
  let original = value;

  function edit() {
    editing = true;
    setTimeout(() => (element as any)?.element?.focus(), 10);
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
  {#if editing && (input === "input" || (input == "geo" && !PUBLIC_GOOGLE_MAPS_API_KEY))}
    <Input
      bind:this={element}
      {placeholder}
      onkeydown={keydown}
      onblur={() => (editing = false)}
      bind:value
    />
  {:else if editing && input === "richtext"}
    <div use:clickOutside={() => (editing = false)}>
      <RichText size={2} bind:value />
    </div>
  {:else if editing && input === "geo"}
    <div use:clickOutside={() => (editing = false)}>
      <GeoLocationSearch bind:textValue={value} bind:geoValue={altValue} />
    </div>
  {:else}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={edit}>
      {@render children()}
    </div>
  {/if}
</div>
