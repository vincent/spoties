<script lang="ts">
  import { client } from "$lib/pocketbase";
  import { t } from "$lib/i18n";
  import NavMini from "$lib/components/Nav/NavMini.svelte";
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
</script>

<section class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
  <NavMini />
  <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 xl:pt-20">
    <div class="mr-auto place-self-center lg:col-span-7">
      <h1 class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight md:text-4xl xl:text-5xl dark:text-white whitespace-pre-wrap leading-16">{@html $t("homepage.headline")}</h1>
      <p class="max-w-2xl mt-5 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{@html $t("homepage.subline")}</p>
      <a href={next.url} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        {next.text}
        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </a>
    </div>
    <div class="hidden lg:mt-0 lg:col-span-5 lg:block">
      <img src="/spoties_logo.png" alt="Spoties" width="100%" height="auto">
    </div>                
  </div>
</section>