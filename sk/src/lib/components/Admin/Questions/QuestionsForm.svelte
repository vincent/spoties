<script lang="ts">
    import { AdminEventStore } from "$lib/stores/admin-event-form";
    import { Button } from "flowbite-svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import { PlusOutline } from "flowbite-svelte-icons";

    let { value = $bindable() } = $props()
</script>

<section class="p-1 antialiased">
    {#each $AdminEventStore.questions as question, index}
        {#if !question.deleted}
            <div class="space-y-4">
                <div class="flex justify-center between-questions">
                    <Button class="h-10 -m5" onclick={() => AdminEventStore.addEventQuestion(index)}><PlusOutline/> Insert question</Button>
                </div>
                <QuestionForm bind:value={$AdminEventStore.questions[index]} removeQuestion={() => AdminEventStore.removeEventQuestion(index)}/>
            </div>
        {/if}
    {/each}
    <div class="mt-4">
        <Button onclick={() => AdminEventStore.addEventQuestion()}><PlusOutline class="mr-2" /> Add a question</Button>
    </div>
</section>

<style>
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