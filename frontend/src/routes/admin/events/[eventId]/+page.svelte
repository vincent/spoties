<script lang="ts">
  import EventFormHelp from "$lib/components/Admin/Events/EventFormHelp.svelte";
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";  
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  const { data } = $props();
  let help = $state({})
  function next() {
    if (!$AdminEventStore.title) return help = { title: true }
    if ($AdminEventStore.description) return help = { description: true }
    return help = { summary: true }
  }
</script>

{#if !data.showHelp}
  <EventForm locations={data.locations || []} config={data.config} />

{:else}
  <EventForm locations={data.locations || []} config={data.config}>
    {#snippet beforeTitle()}
      {#if !form.title}
        <EventFormHelp
          class="mb-6"
          title="Let's write a nice title."
          description="The first thing users will see is the title. It should be short and describing the subject."
        />
      {/if}
    {/snippet}
    {#snippet beforeDescription()}
      {#if form.title && !form.description}
        <EventFormHelp
          class="mb-6"
          title="Explain what the form is about."
          description="Now we should explain fazd azd azd azd."
        />
      {/if}
    {/snippet}
  </EventForm>
{/if}
