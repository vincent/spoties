<script lang="ts">
  import { t } from "$lib/i18n";
  const { siteName, signup } = $props();
</script>

<figure
  class="flex w-full flex-col lg:mr-4 lg:w-3/5 {signup
    ? 'justify-center'
    : 'justify-between'} border-b border-gray-200 px-6 pb-8 text-center lg:border-r lg:border-b-0 dark:border-gray-700 dark:bg-gray-800"
>
  <blockquote class="mx-auto mb-10 max-w-2xl text-gray-500 dark:text-gray-400">
    <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
      {$t("event.form.finish.line1")}
    </h3>
    <p class="my-4 font-light">{$t("event.form.finish.line2")}</p>
    <p class="my-4 font-light">{$t("event.form.finish.line3")}</p>
  </blockquote>
  <figcaption
    class="flex items-center justify-center space-x-3 rtl:space-x-reverse"
  >
    <img
      class="h-15 w-15 rounded-full"
      src="https://avatars.githubusercontent.com/u/5623?v=4"
      alt="Vincent Lark"
    />
    <div class="space-y-0.5 text-left font-medium dark:text-white">
      <div>
        <a href="http://github.com/vincent" target="_blank">Vincent</a>
      </div>
      <div class="text-sm font-light text-gray-500 dark:text-gray-400">
        {siteName} team
      </div>
    </div>
  </figcaption>
</figure>
