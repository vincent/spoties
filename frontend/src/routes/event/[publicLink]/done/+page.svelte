<script>
  import { ArrowLeft } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { t } from "$lib/i18n";
  import { ThumbsUpOutline } from "flowbite-svelte-icons";
</script>

<section
  class="min-h-screen bg-white px-4 py-8 antialiased md:py-16 dark:bg-gray-900"
>
  <div
    class="mx-auto grid max-w-screen-xl rounded-lg bg-gray-50 p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16 dark:bg-gray-800"
  >
    <div class="mx-auto lg:col-span-5 lg:mt-0">
      <ThumbsUpOutline
        class="h-80 w-80 text-gray-900 md:text-4xl dark:text-white"
      />
    </div>
    <div class="mx-auto place-self-center text-center lg:col-span-7">
      <h1
        class="mb-3 text-2xl leading-tight font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
        in:fly={{ y: 100, delay: 300, easing: backOut }}
      >
        {$t("event.done.thx")}
      </h1>
      <p class="mb-6 text-gray-500 dark:text-gray-400">
        {$t("event.done.answers_sent")}
      </p>
      <a
        href=".."
        class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
        ><ArrowLeft class="mr-2" /> {$t("event.done.review_answers")}
      </a>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        or <a href="#" on:click|preventDefault={() => window.close()}
          >{$t("event.done.close_window")}</a
        >
      </p>
    </div>
  </div>
</section>
