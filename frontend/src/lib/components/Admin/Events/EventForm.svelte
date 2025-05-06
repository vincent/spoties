<script lang="ts">
  import EventFormSummary from "../Events/EventFormSummary.svelte";
  import LocationsSelector from "../Locations/LocationsSelector.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
  import FieldErrors from "$lib/components/Shared/FieldErrors.svelte";
  import { Label, FloatingLabelInput, A, Accordion, AccordionItem } from "flowbite-svelte";
  import QuestionsForm from "../Questions/QuestionsForm.svelte";
  import RichText from "$lib/components/Shared/RichText.svelte";
  import { t } from "$lib/i18n";
    import { Link2Icon } from "lucide-svelte";

  const { locations, config } = $props();
  let validation = $derived(AdminEventStore.valid($AdminEventStore))
  let publicLink = $derived(`${config.site?.url}/event/${$AdminEventStore.id}`)
</script>

<form class="flex justify-center items-start" onsubmit={() => AdminEventStore.updateEvent($AdminEventStore)}>
  <div class="w-3/4">
    <div class="mb-6">
      <FloatingLabelInput required classDiv="mb-4" classInput="text-3xl" color={validation?.error?.fieldErrors?.title ? "red" : undefined} type="text" bind:value={$AdminEventStore.title}>
        {$t('event.form.event_title')}
      </FloatingLabelInput>
      <FieldErrors validationErrors={validation?.error?.fieldErrors?.title} />
    </div>

    {#if $AdminEventStore.id}
      <div class="mb-6">
        <Label class="mb-2 block text-2xl">{$t('event.form.public_link')}</Label>
        <A target="_blank" href={publicLink}><Link2Icon class="mr-2" /> {publicLink}</A>
      </div>
    {/if}

    <div class="mb-6 accordion">
      <Accordion>
        <AccordionItem>
          <span slot="header">{$t('event.form.description')}</span>
          <RichText bind:value={$AdminEventStore.description} color={validation?.error?.fieldErrors?.description ? "red" : undefined}/>
          <FieldErrors validationErrors={validation?.error?.fieldErrors?.description} />
        </AccordionItem>
        <AccordionItem>
          <span slot="header">{$t('event.form.questions')}</span>
          <QuestionsForm bind:value={$AdminEventStore.questions} />
        </AccordionItem>
        <AccordionItem>
          <span slot="header">{$t('event.form.locations')}</span>
          <LocationsSelector
            {locations}
            bind:value={$AdminEventStore.locations}
            submit={() => AdminEventStore.updateEvent($AdminEventStore)}
          />
        </AccordionItem>
      </Accordion>
    </div>
  </div>
  <div class="ml-3 w-1/4 sticky top-18">
    <EventFormSummary submit={() => AdminEventStore.updateEvent($AdminEventStore)} />
  </div>
</form>

<style>
  :global(.accordion .group:first-child + div div.p-5) {
    padding: 0 !important;
  }
</style>