<script lang="ts">
  import type { QuestionType } from "$lib/pocketbase/types";
  import { DropdownItem, Helper } from "flowbite-svelte";
  import type { Snippet } from "svelte";
  import { t } from "$lib/i18n";

  let {
    itemClass = "",
    key,
    helper,
    select,
    children,
  }: {
    itemClass?: string;
    key: QuestionType;
    helper?: string;
    select: (k: QuestionType) => void;
    children?: Snippet;
  } = $props();

  let open = $state(false);
  function selectHandler(v: QuestionType) {
    open = false;
    select?.(v);
  }
</script>

<DropdownItem
  class={`w-full min-w-50 question-type-${key} ${itemClass}`}
  onclick={() => selectHandler(key)}
>
  <span class="flex content-center"
    >{@render children?.()} {$t(`event.form.question_type_${key}` as any)}</span
  >
  {#if helper}
    <Helper class="ps-8 text-end">{helper}</Helper>
  {/if}
</DropdownItem>
