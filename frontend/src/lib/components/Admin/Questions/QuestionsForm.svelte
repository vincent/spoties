<script lang="ts">
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  import { DotsVerticalOutline, PlusOutline } from "flowbite-svelte-icons";
  import { reorder, useSortable } from "$lib/utils/use-sortable.svelte";
  import { Button, Tooltip } from "flowbite-svelte";
  import QuestionForm from "./QuestionForm.svelte";
  import { t } from "$lib/i18n";

  let { value = $bindable() } = $props();

  let sortable = $state<HTMLElement | null>(null);

  useSortable(() => sortable, {
    animation: 200,
    handle: ".my-handle",
    ghostClass: "opacity-0",
    onEnd(evt) {
      $AdminEventStore.questions = [].concat(
        reorder($AdminEventStore.questions, evt) as any
      );
    },
  });
</script>

<section class="p-1 antialiased" bind:this={sortable}>
  {#each $AdminEventStore.questions as question, index (question)}
    {#if !question.deleted}
      <div class="relative space-y-4">
        <button
          type="button"
          class="my-handle cursor-move text-gray-600 outline-none dark:text-gray-200"
        >
          <DotsVerticalOutline /><Tooltip>{$t("act.reorder")}</Tooltip>
        </button>
        <div class="ps-2">
          <div class="between-questions flex justify-center">
            <Button
              class="insert-question -m5 h-10"
              onclick={() => AdminEventStore.questions.add(index)}
              ><PlusOutline /> {$t("event.form.add_question")}</Button
            >
          </div>
          <QuestionForm
            questionIndex={index}
            bind:value={$AdminEventStore.questions[index]}
            removeQuestion={() => AdminEventStore.questions.remove(index)}
          />
        </div>
      </div>
    {:else}
      <div class="relative space-y-4"></div>
      <!-- keep me for dnd -->
    {/if}
  {/each}

  <div class="mt-4 grid justify-items-end pr-12">
    <Button
      class="append-question"
      onclick={() => AdminEventStore.questions.add()}
      ><PlusOutline class="mr-2" /> {$t("event.form.add_question")}</Button
    >
  </div>
</section>

<style>
  .my-handle {
    position: absolute;
    left: -15px;
    top: 3.5rem;
  }
  .between-questions {
    overflow: visible;
    transition: all 100ms ease-out;
    max-height: 10px;
    height: 10px;
    opacity: 0;
  }
  .between-questions:hover {
    opacity: 1;
  }
</style>
