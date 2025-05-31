<script>
  import { ArrowRightOutline } from "flowbite-svelte-icons";
  import SpotiesLogo from "./SpotiesLogo.svelte";
  let { title, subtext = null, href, button, className = "" } = $props();
</script>

<div
  class="align-items-center mx-auto grid min-h-screen max-w-screen-xl justify-items-center px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 xl:pt-20 xl:pb-50 {className}"
>
  <div class="mr-auto place-self-center lg:col-span-7">
    <h1
      class="hero-headline mb-4 max-w-2xl text-3xl leading-16 font-extrabold tracking-tight whitespace-pre-wrap md:text-4xl xl:text-5xl dark:text-white"
    >
      {@render title()}
    </h1>
    {#if subtext}
      <p
        class="mt-5 mb-6 max-w-2xl font-light text-gray-700 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400"
      >
        {@render subtext()}
      </p>
    {/if}
    <a
      {href}
      class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white transition-colors duration-400 focus:ring-4"
    >
      {button}
      <ArrowRightOutline class="ml-2" />
    </a>
  </div>
  <div class="hidden place-self-center lg:col-span-5 lg:mt-0 lg:block">
    <SpotiesLogo />
  </div>
</div>
