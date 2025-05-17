<script lang="ts">
  import { client } from "$lib/pocketbase";
  import { t } from "$lib/i18n";
  import NavMini from "$lib/components/Nav/NavMini.svelte";
  import { Carousel, Controls, P } from "flowbite-svelte";
    import { text } from "@sveltejs/kit";

  const { data } = $props();

  // you could set the metadata either here or in +page.ts
  data.metadata.headline = $t("homepage.headline");
  data.metadata.subline = $t("homepage.subline");

  const auth = client.authStore
  let next = $derived(!auth.isValid
    ? { text: $t("homepage.getting_started"), url: '/login' }
    : {
        text: $t("homepage.staff_new_event"),
        url: '/admin/events',
    });

  const alt = 1
  const highlight = text => text
    .replaceAll('{{', '<span class="text-primary-600">')
    .replaceAll('}}', '</span>')

  const ctas = [
    `Start organizing {{smarter}} today.`,
    `{{Simplify}} your next event.`,
    `Your perfect event crew is just {{one click away}}.`,
    `{{Never stress}} about event staffing again.`,
  ].map(highlight)

  const features = [
    {
      text: `Design perfect forms in {{minutes}}, not hours.`,
      images: [
        {
          alt: "Event Description",
          src: "/assets/event-combined-1-description.png",
          title: "Description"
        },
        {
          alt: "Event Questions",
          src: "/assets/event-combined-2-questions.png",
          title: "Questions"
        },
        {
          alt: "Event Locations",
          src: "/assets/event-combined-3-locations.png",
          title: "Locations"
        },
      ]
    },
    {
      text: `Deploy forms that work great on {{any device}}.`,
      images: [
        {
          alt: "Event Description",
          src: "/assets/event-10-form.png",
          title: "Description"
        },
      ]
    },
    {
      text: `Organize staff by location with {{one-click}} simplicity.`,
      images: [
        {
          alt: "Event Description",
          src: "/assets/event-10-form.png",
          title: "Description"
        },
      ]
    },
    {
      texts: [
        `Keep everyone {{synchronized}} through every change,`,
        `stay {{informed}} as responses roll in.`,
      ],
      images: [
        {
          alt: "Event Description",
          src: "/assets/event-10-form.png",
          title: "Description"
        },
      ]
    },
    {
      text: `{{Reassign}} staff with automatic notifications.`,
      images: [
        {
          alt: "Event Description",
          src: "/assets/event-10-form.png",
          title: "Description"
        },
      ]
    },
  ].map(f => ({
    ...f,
    texts: f.texts ? f.texts.map(t => highlight(t)) : null,
    text: f.text ? highlight(f.text) : null,
  }))
</script>

<section class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
  <NavMini />

  <div class="min-h-screen grid align-items-center justify-items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 xl:pt-20 xl:pb-50">
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1 class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl dark:text-white whitespace-pre-wrap leading-16">{@html $t("homepage.headline")}</h1>
      <p class="max-w-2xl mt-5 mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{@html $t("homepage.subline")}</p>
      <a href={next.url} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        {next.text}
        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
    <div class="hidden place-self-center lg:mt-0 lg:col-span-5 lg:block">
      <img class="max-w-[300px]" src="/spoties_logo.svg" alt="Spoties" width="100%" height="auto">
    </div>
  </div>

  {#each features as feature, i}
    {#if feature.texts}
      <div class="grid justify-items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 xl:pt-10">
        <div class="mr-auto place-self-center lg:col-span-5 lg:pe-40 w-full {i % 2 === alt ? 'order-first sm:order-last' : ''}">
          {#each feature.texts as text, j}
            <P class="my-15 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl" align={j%2 ? 'right' : 'left'}>{@html text}</P>
          {/each}
        </div>
        <div class="mr-auto place-self-center lg:col-span-6 w-full {i % 2 === alt ? 'order-last sm:order-first' : ''}">
          <Carousel divClass="max-w-[400px] mx-auto" images={feature.images} duration={3000} slideDuration={0} />
        </div>
      </div>  
    {:else if feature.text}
      <div class="grid justify-items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 xl:pt-10">
        <div class="mr-auto place-self-center lg:col-span-5 lg:ps-40 w-full {i % 2 === alt ? 'order-first sm:order-last' : ''}">
          <P class="my-10 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl" align="center">{@html feature.text}</P>
        </div>
        <div class="mr-auto place-self-center lg:col-span-6 w-full {i % 2 === alt ? 'order-last sm:order-first' : ''}">
          <Carousel divClass="max-w-[400px] mx-auto" images={feature.images} duration={3000} slideDuration={0} />
        </div>
      </div>  
    {/if}
  {/each}

  <div class="mb-20"> </div>

  <div class="min-h-screen grid align-items-center justify-items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 xl:pt-20 xl:pb-50">
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1 class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl dark:text-white whitespace-pre-wrap leading-16">{@html ctas[0]}</h1>
      <div class="text-center">
        <a href={next.url} class="inline-flex items-center justify-center px-5 py-3 mt-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
          It's free
          <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>
    </div>
    <div class="hidden place-self-center lg:mt-0 lg:col-span-5 lg:block">
      <img class="max-w-[300px]" src="/spoties_logo.svg" alt="Spoties" width="100%" height="auto">
    </div>
  </div>

  <div class="mb-20"> </div>
</section>

<style></style>