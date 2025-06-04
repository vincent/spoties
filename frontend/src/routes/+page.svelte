<script lang="ts">
  import NavMini from "$lib/components/Nav/NavMini.svelte";
  import { client } from "$lib/pocketbase";
  import { t } from "$lib/i18n";

  import Hero from "$lib/components/Shared/Hero.svelte";
  import Features from "$lib/components/Shared/Features.svelte";
  import { highlight } from "$lib/utils/utils.js";

  const { data } = $props();

  // you could set the metadata either here or in +page.ts
  data.metadata.headline = $t("homepage.headline");
  data.metadata.subline = $t("homepage.subline");

  const auth = client.authStore;
  let next = $derived(
    !auth.isValid
      ? {
          text: $t("homepage.getting_started"),
          url: "/admin/events/create",
        }
      : {
          text: $t("homepage.staff_new_event"),
          url: "/admin/events/create",
        }
  );

  const ctas = $derived(
    [$t("ctas.0"), $t("ctas.1"), $t("ctas.2"), $t("ctas.3")].map(highlight)
  );
</script>

<section
  class="frontpage flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900"
>
  <NavMini />

  <Hero href={next.url} button={next.text}>
    {#snippet title()}{@html $t("homepage.headline")}{/snippet}
    {#snippet subtext()}{@html $t("homepage.subline")}{/snippet}
  </Hero>

  <Features {next} />

  <Hero className="my-20" href={next.url} button={"It's free"}>
    {#snippet title()}{@html ctas[~~(Math.random() * ctas.length)]}{/snippet}
    {#snippet subtext()}<br />{/snippet}
  </Hero>
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
