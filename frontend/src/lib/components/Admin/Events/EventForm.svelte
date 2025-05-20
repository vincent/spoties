<script lang="ts">
  import { Label, FloatingLabelInput, A, Accordion, AccordionItem } from "flowbite-svelte";
  import LocationsSelector from "../Locations/LocationsSelector.svelte";
  import { AdminEventStore } from "$lib/stores/form.admin.event.svelte";
  import FieldErrors from "$lib/components/Shared/FieldErrors.svelte";
  import ThemePicker from "$lib/components/Shared/ThemePicker.svelte";
  import EventFormSummary from "../Events/EventFormSummary.svelte";
  import QuestionsForm from "../Questions/QuestionsForm.svelte";
  import RichText from "$lib/components/Shared/RichText.svelte";
  import { Link2Icon } from "lucide-svelte";
  import { t } from "$lib/i18n";
    import { client } from "$lib/pocketbase";

  const { locations, config } = $props();
  let validation = $derived(AdminEventStore.validate($AdminEventStore))
  let publicLink = $derived(`${config.site?.url}/event/${$AdminEventStore.id}`)

  function submitForm() {
    return !!client.authStore?.record
      ? AdminEventStore.updateEvent($AdminEventStore)
      : AdminEventStore.storeEvent($AdminEventStore)
  }

</script>

<form class="flex justify-center items-start flex-col xl:flex-row" onsubmit={submitForm}>
  <div class="w-full xl:w-3/4">
    <div class="mb-6">
      <FloatingLabelInput required class="mb-4" inputClass="text-3xl" color={validation?.error?.fieldErrors?.title ? "default" : undefined} type="text" bind:value={$AdminEventStore.title}>
        {$t('event.form.event_title')}
      </FloatingLabelInput>
      <FieldErrors validationErrors={validation?.error?.fieldErrors?.title} />
    </div>

    {#if $AdminEventStore.id}
      <div class="mb-6 flex justify-between">
        <div>
          <Label class="hidden md:block mb-2 text-2xl">{$t('event.form.public_link')}</Label>
          <A target="_blank" href={publicLink}><Link2Icon class="mr-2" /> {publicLink}</A>
        </div>
        <div>
          <ThemePicker bind:value={$AdminEventStore.theme} />
        </div>
      </div>
    {/if}

    <div class="mb-6 accordion">
      <Accordion>
        <AccordionItem>
          {#snippet header()}{$t('event.form.description')}{/snippet}
          <RichText bind:value={$AdminEventStore.description} color={validation?.error?.fieldErrors?.description ? "base" : undefined}/>
          <FieldErrors helperClass="px-2 mb-2" validationErrors={validation?.error?.fieldErrors?.description} />
        </AccordionItem>
        <AccordionItem>
          {#snippet header()}{$t('event.form.questions')}{/snippet}
          <QuestionsForm bind:value={$AdminEventStore.questions} />
        </AccordionItem>
        <AccordionItem>
          {#snippet header()}{$t('event.form.locations')}{/snippet}
          <LocationsSelector
            {locations}
            bind:value={$AdminEventStore.locations}
          />
        </AccordionItem>
      </Accordion>
    </div>
  </div>
  <div class="mt-3 w-full xl:mt-0 xl:ml-3 xl:w-1/4 xl:sticky xl:top-18 xl:ps-4">
    <EventFormSummary submit={submitForm} />
  </div>
</form>

<style>
  :global(.accordion .group:first-child + div div.p-5) {
    padding: 0 !important;
  }
  :global(
    .accordion,
    .accordion > div,
    .accordion .group,
    .accordion .group > button,
    .accordion .group + div > div
  ) {
    border: none;
  }
</style>