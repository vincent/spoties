<script lang="ts">
  import userForm from "/src/assets/event-10-form.png";
  import reassign from "/src/assets/event-4-reassign.png";
  import slotsForm from "/src/assets/event-6-slots.png";
  import notification from "/src/assets/event-5-notification.png";
  import combined1 from "/src/assets/event-combined-1-description.png";
  import combined2 from "/src/assets/event-combined-2-questions.png";
  import combined3 from "/src/assets/event-combined-3-locations.png";
  import { Carousel, P } from "flowbite-svelte";
  import { highlight } from "$lib/utils/utils";
  import { t } from "$lib/i18n";

  let { next } = $props();

  const alt = 1;
  const features = $derived(
    [
      {
        text: $t("homepage.f1"),
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
        text: $t("homepage.f2"),
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
        text: $t("homepage.f3"),
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
        texts: [$t("homepage.f4"), $t("homepage.f5")],
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
        text: $t("homepage.f6"),
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
    }))
  );
</script>

{#each features as feature, i}
  {@const odd = i % 2 === alt}
  {@const smol = odd ? "order-first sm:order-last" : ""}
  {@const smof = odd ? "order-last sm:order-first" : ""}
  {@const block =
    "mx-auto grid max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-10"}
  {@const inner = "mr-auto w-full place-self-center"}
  <div class={`feature w-full feature-${i}`}>
    {#if feature.texts}
      <div class={block}>
        <div class="{inner} lg:col-span-5 lg:pe-40 {smol}">
          {#each feature.texts as text, j}
            <P
              class="my-15 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl"
              align={j % 2 ? "right" : "left"}>{@html text}</P
            >
          {/each}
        </div>
        <div class="{inner} lg:col-span-6 {smof}">
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
      <div class={block}>
        <div class="{inner} lg:col-span-5 lg:ps-40 {smol}">
          <P
            class="my-10 text-xl font-extrabold tracking-tight md:text-2xl xl:text-3xl"
            align="center">{@html feature.text}</P
          >
        </div>
        <div class="{inner} lg:col-span-6 {smof}">
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
