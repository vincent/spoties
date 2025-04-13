<script lang="ts">
    import { AdminEventStore } from "$lib/stores/admin-event-form";
    import { Button } from "flowbite-svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import { PlusOutline } from "flowbite-svelte-icons";

    let { value = $bindable() } = $props()
</script>

<section class="p-1 antialiased">
    {#each $AdminEventStore.questions as question, index}
        <div class="space-y-4">
            <QuestionForm bind:value={$AdminEventStore.questions[index]} />
        </div>
    {/each}
    <div class="mt-4">
        <Button onclick={() => AdminEventStore.addEventQuestion()}><PlusOutline class="mr-2" /> Add a question</Button>
    </div>
</section>
