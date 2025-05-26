<script lang="ts">
  import { Label, FloatingLabelInput, A, Accordion, AccordionItem } from "flowbite-svelte";
  import type { LocationsResponse } from "$lib/pocketbase/generated-types";
  import LocationsSelector from "../Locations/LocationsSelector.svelte";
  import { AdminEventStore as store } from "$lib/stores/form.admin.event.svelte";
  import FieldErrors from "$lib/components/Shared/FieldErrors.svelte";
  import ThemePicker from "$lib/components/Shared/ThemePicker.svelte";
  import EventFormSummary from "../Events/EventFormSummary.svelte";
  import QuestionsForm from "../Questions/QuestionsForm.svelte";
  import RichText from "$lib/components/Shared/RichText.svelte";
  import EventFormHelp from "./EventFormHelp.svelte";
  import { Link2Icon } from "lucide-svelte";
  import { client } from "$lib/pocketbase";
  import type { Snippet } from "svelte";
  import { t } from "$lib/i18n";

  let {
    locations,
    config,
    showHelp,
    accordionOpen = $bindable({
      description: false,
      questions: false,
      locations: false,
    }),
  }: {
    locations: LocationsResponse[],
    config: any,
    accordionOpen?: any,
    showHelp?: boolean,
    children?: Snippet,
  } = $props();

  let validation = $derived(store.validate($store))
  let publicLink = $derived(`${config.site?.url}/event/${$store.id}`)

  let help = $state<{
    title?: boolean,
    description?: boolean,
    questions?: boolean,
    locations?: boolean,
    summary?: boolean,
    save?: boolean,
  }>({})

  function next() {
    help = {}
    if (!$store.title) return help = { title: true }
    if (!$store.description) {
      accordionOpen = { description: true, questions: false, locations: false }
      return help = { description: true }
    }
    if (!$store.questions?.length) {
      accordionOpen = { questions: true, description: false, locations: false }
      return help = { questions: true }
    }
    if (!$store.locations?.length) {
      accordionOpen = { locations: true, description: false, questions: false }
      return help = { locations: true }
    }
    if (!$store.published && !$store.sealed) return help = { summary: true }
    return help = { save: true }
  }
  next()

  function submitForm() {
    return !!client.authStore?.record
      ? store.updateEvent($store)
      : store.storeEvent($store)
  }
</script>

<form class="flex justify-center items-start flex-col xl:flex-row" onsubmit={submitForm}>
  <div class="w-full xl:w-3/4">
    {#if showHelp && help.title}
      <EventFormHelp
        {next}
        disabled={!$store.title}
        class="mb-6"
        title={$t('event.form.help.title')}
        description={$t('event.form.help.title.desc')}
      />
    {/if}
    <div class="mb-6">
      <FloatingLabelInput required class="mb-4" inputClass="text-3xl" color={validation?.error?.fieldErrors?.title ? "default" : undefined} type="text" bind:value={$store.title}>
        {$t('event.form.event_title')}
      </FloatingLabelInput>
      <FieldErrors validationErrors={validation?.error?.fieldErrors?.title} />
    </div>

    {#if $store.id}
      <div class="mb-6 flex justify-between">
        <div>
          <Label class="hidden md:block mb-2 text-2xl">{$t('event.form.public_link')}</Label>
          <A target="_blank" href={publicLink}><Link2Icon class="mr-2" /> {publicLink}</A>
        </div>
        <div>
          <ThemePicker bind:value={$store.theme} />
        </div>
      </div>
    {/if}

    <div class="mb-6 accordion">
      <Accordion>

        {#if showHelp && help.description}
          <EventFormHelp
            {next}
            disabled={!$store.description}
            class="mb-6"
            title={$t('event.form.help.description')}
            description={$t('event.form.help.description.desc')}
          />
        {/if}
        <AccordionItem bind:open={accordionOpen.description} class="border-b border-gray-200 dark:border-gray-700 border-s border-e">
          {#snippet header()}{$t('event.form.description')}{/snippet}
          <RichText bind:value={$store.description} color={validation?.error?.fieldErrors?.description ? "base" : undefined}/>
          <FieldErrors helperClass="px-2 mb-2" validationErrors={validation?.error?.fieldErrors?.description} />
        </AccordionItem>

        {#if showHelp && help.questions}
          <EventFormHelp
            {next}
            disabled={!$store.questions?.length || !!validation?.error?.fieldErrors?.questions}
            class="mb-6"
            title={$t('event.form.help.questions')}
            description={$t('event.form.help.questions.desc')}
          />
        {/if}
        <AccordionItem bind:open={accordionOpen.questions}>
          {#snippet header()}{$t('event.form.questions')}{/snippet}
          <QuestionsForm bind:value={$store.questions} />
        </AccordionItem>

        {#if showHelp && help.locations}
          <EventFormHelp
            {next}
            disabled={!$store.locations?.length || !!validation?.error?.fieldErrors?.locations}
            class="mb-6"
            title={$t('event.form.help.locations')}
            description={$t('event.form.help.locations.desc')}
          />
        {/if}
        <AccordionItem bind:open={accordionOpen.locations}>
          {#snippet header()}{$t('event.form.locations')}{/snippet}
          <LocationsSelector
            {locations}
            bind:value={$store.locations}
          />
        </AccordionItem>

      </Accordion>
    </div>
  </div>
  <div class="mt-3 w-full xl:mt-0 xl:ml-3 xl:w-1/4 xl:sticky xl:top-18 xl:ps-4">
    {#if showHelp && help.summary}
      <EventFormHelp
        {next}
        disabled={!$store.published && !$store.sealed}
        class="mb-6"
        title={$t('event.form.help.summary')}
        description={$t('event.form.help.summary.desc')}
      />
    {/if}

    <EventFormSummary submit={submitForm} />

    {#if showHelp && help.save}
      <EventFormHelp
        disabled={!$store.published && !$store.sealed}
        class="mt-6"
        title={$t('event.form.help.save')}
        description={$t('event.form.help.save.desc')}
      />
    {/if}
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