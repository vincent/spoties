<script lang="ts">
  import { page } from "$app/stores";
  import { t } from "$lib/i18n";
</script>

<section class="bg-white dark:bg-gray-900">
  <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
    <div class="mx-auto max-w-screen-sm text-center">
      <h1
        class="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl"
      >
        {$page.status}
      </h1>
      <p
        class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
      >
        {$page.error?.message}
      </p>
      <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        {$t("errors.we_are_on_it")}
      </p>
    </div>
  </div>
</section>
