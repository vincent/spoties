<script lang="ts">
  import NavMini from "$lib/components/Nav/NavMini.svelte";
  import { Carousel, P } from "flowbite-svelte";
  import { client } from "$lib/pocketbase";
  import { t } from "$lib/i18n";

  import userForm from "/src/assets/event-10-form.png";
  import reassign from "/src/assets/event-4-reassign.png";
  import slotsForm from "/src/assets/event-6-slots.png";
  import notification from "/src/assets/event-5-notification.png";
  import combined1 from "/src/assets/event-combined-1-description.png";
  import combined2 from "/src/assets/event-combined-2-questions.png";
  import combined3 from "/src/assets/event-combined-3-locations.png";
  import SpotiesLogo from "$lib/components/Shared/SpotiesLogo.svelte";

  const { data } = $props();

  // you could set the metadata either here or in +page.ts
  data.metadata.headline = $t("homepage.headline");
  data.metadata.subline = $t("homepage.subline");

  const auth = client.authStore;
  let next = $derived(
    !auth.isValid
      ? {
          text: $t("homepage.getting_started"),
          url: "/login",
        }
      : {
          text: $t("homepage.staff_new_event"),
          url: "/admin/events/create",
        }
  );

  const alt = 1;
  const highlight = (text) =>
    text
      .replaceAll("{{", '<span class="text-primary-600">')
      .replaceAll("}}", "</span>");

  const ctas = [
    `Start organizing {{smarter}} today.`,
    `{{Simplify}} your next event.`,
    `Your perfect event crew is just {{one click away}}.`,
    `{{Never stress}} about event staffing again.`,
  ].map(highlight);

  const features = [
    {
      text: `Design perfect forms in {{minutes}}, not hours.`,
      images: [
        {
          alt: "Event Description",
          src: combined1,
          title: "Description",
        },
        {
          alt: "Event Questions",
          src: combined2,
          title: "Questions",
        },
        {
          alt: "Event Locations",
          src: combined3,
          title: "Locations",
        },
      ],
    },
    {
      text: `Deploy forms that work great on {{any device}}.`,
      imgClass:
        "shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out moveV",
      images: [
        {
          alt: "Responsive mobile form",
          src: userForm,
          title: "Responsive mobile form",
        },
      ],
    },
    {
      text: `Organize staff by location with {{one-click}} simplicity.`,
      imgClass:
        "shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out moveH",
      images: [
        {
          alt: "Location slots management",
          src: slotsForm,
          title: "Location slots management",
        },
      ],
    },
    {
      texts: [
        `Keep everyone {{synchronized}} through every change,`,
        `stay {{informed}} as responses roll in.`,
      ],
      imgClass:
        "shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out moveH",
      images: [
        {
          alt: "Email notification",
          src: notification,
          title: "Email notification",
        },
      ],
    },
    {
      text: `{{Reassign}} staff with automatic notifications.`,
      imgClass:
        "shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out moveH",
      images: [
        {
          alt: "Spot reassignment with notification",
          src: reassign,
          title: "Spot reassignment with notification",
        },
      ],
    },
  ].map((f) => ({
    ...f,
    texts: f.texts ? f.texts.map((t) => highlight(t)) : null,
    text: f.text ? highlight(f.text) : null,
  }));
</script>

<section class="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
  <NavMini />

  <div
    class="align-items-center mx-auto grid min-h-screen max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-20 xl:pb-50"
  >
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1
        class="hero-headline mb-4 max-w-2xl text-3xl leading-16 font-extrabold tracking-tight whitespace-pre-wrap md:text-4xl xl:text-5xl dark:text-white"
      >
        {@html $t("homepage.headline")}
      </h1>
      <p
        class="mt-5 mb-6 max-w-2xl font-light text-gray-700 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400"
      >
        {@html $t("homepage.subline")}
      </p>
      <a
        href={next.url}
        class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white transition-colors duration-400 focus:ring-4"
      >
        {next.text}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path></svg
        >
      </a>
    </div>
    <div class="hidden place-self-center lg:col-span-5 lg:mt-0 lg:block">
      <SpotiesLogo />
    </div>
  </div>

  {#each features as feature, i}
    <div class={`feature w-full feature-${i}`}>
      {#if feature.texts}
        <div
          class="mx-auto grid max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-10"
        >
          <div
            class="mr-auto w-full place-self-center lg:col-span-5 lg:pe-40 {i %
              2 ===
            alt
              ? 'order-first sm:order-last'
              : ''}"
          >
            {#each feature.texts as text, j}
              <P
                class="my-15 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl"
                align={j % 2 ? "right" : "left"}>{@html text}</P
              >
            {/each}
          </div>
          <div
            class="mr-auto w-full place-self-center lg:col-span-6 {i % 2 === alt
              ? 'order-last sm:order-first'
              : ''}"
          >
            <a href={next.url}>
              <Carousel
                divClass="max-w-[400px] mx-auto {feature.imgClass}"
                images={feature.images}
                duration={3000}
                slideDuration={0}
              />
            </a>
          </div>
        </div>
      {:else if feature.text}
        <div
          class="mx-auto grid max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-10"
        >
          <div
            class="mr-auto w-full place-self-center lg:col-span-5 lg:ps-40 {i %
              2 ===
            alt
              ? 'order-first sm:order-last'
              : ''}"
          >
            <P
              class="my-10 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl"
              align="center">{@html feature.text}</P
            >
          </div>
          <div
            class="mr-auto w-full place-self-center lg:col-span-6 {i % 2 === alt
              ? 'order-last sm:order-first'
              : ''}"
          >
            <a href={next.url}>
              <Carousel
                divClass="max-w-[400px] mx-auto {feature.imgClass}"
                images={feature.images}
                duration={3000}
                slideDuration={0}
              />
            </a>
          </div>
        </div>
      {/if}
    </div>
  {/each}

  <div class="mb-20"></div>

  <div
    class="align-items-center mx-auto grid min-h-screen max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-20 xl:pb-50"
  >
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1
        class="mb-4 max-w-2xl text-3xl leading-16 font-extrabold tracking-tight whitespace-pre-wrap md:text-4xl xl:text-5xl dark:text-white"
      >
        {@html ctas[~~(Math.random() * ctas.length)]}
      </h1>
      <div class="text-center">
        <a
          href={next.url}
          class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mt-5 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
        >
          It's free
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
          >
        </a>
      </div>
    </div>
    <div class="hidden place-self-center lg:col-span-5 lg:mt-0 lg:block">
      <SpotiesLogo />
    </div>
  </div>

  <div class="mb-20"></div>
</section>

<style>
  @keyframes moveH {
    0% {
      object-position: -18px 0px;
    }
    100% {
      object-position: 0px 0px;
    }
  }
  @keyframes moveV {
    0% {
      object-position: 0px -50px;
    }
    100% {
      object-position: 0px 0px;
    }
  }
  :global(.moveH .object-cover:hover) {
    animation: moveH 0.5s linear;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }
  :global(.moveV .object-cover:hover) {
    animation: moveV 0.5s linear;
    animation-iteration-count: 1;
    animation-fill-mode: both;
  }
</style>
