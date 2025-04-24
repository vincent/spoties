<script lang="ts">
    import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
    import { Button, Tooltip } from "flowbite-svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import { DotsVerticalOutline, PlusOutline } from "flowbite-svelte-icons";
	import { t } from "$lib/i18n";
    import { reorder, useSortable } from "$lib/hooks/use-sortable.svelte";

    let { value = $bindable() } = $props()

    let sortable = $state<HTMLElement | null>(null);

    useSortable(() => sortable, {
        animation: 200,
        handle: '.my-handle',
        ghostClass: 'opacity-0',
        onEnd(evt) {
            $AdminEventStore.questions = [].concat(reorder($AdminEventStore.questions, evt) as any);
        }
    });
</script>

<section class="p-1 antialiased" bind:this={sortable}>
    {#each $AdminEventStore.questions as question, index (question)}
        {#if !question.deleted}
            <div class="relative space-y-4">
                <button type="button" class="my-handle outline-none text-gray-600 dark:text-gray-200 cursor-move">
                    <DotsVerticalOutline /><Tooltip>{$t('act.reorder')}</Tooltip>
                </button>
                <div class="ps-2">
                    <div class="flex justify-center between-questions">
                        <Button class="h-10 -m5" onclick={() => AdminEventStore.addEventQuestion(index)}><PlusOutline/> {$t('event.form.add_question')}</Button>
                    </div>
                    <QuestionForm questionIndex={index} bind:value={$AdminEventStore.questions[index]} removeQuestion={() => AdminEventStore.removeEventQuestion(index)}/>
                </div>
            </div>
        {:else}
            <div class="relative space-y-4">
            </div>
        {/if}
    {/each}
    <div class="mt-4 pr-12 grid justify-items-end">
        <Button onclick={() => AdminEventStore.addEventQuestion()}><PlusOutline class="mr-2" /> {$t('event.form.add_question')}</Button>
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