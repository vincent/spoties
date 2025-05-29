<script>
  import { client } from "$lib/pocketbase";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { t } from "$lib/i18n";

  let verified = $state(client.authStore.record?.verified);

  onMount(() => {
    if (!client.authStore.record?.id) return goto("/login");
    client.collection("users").subscribe(client.authStore.record?.id, (e) => {
      verified = e.record.verified;
    });
  });
</script>

<section
  class="min-h-screen bg-white px-4 py-8 antialiased md:py-16 dark:bg-gray-900"
>
  <div
    class="mx-auto grid max-w-screen-xl rounded-lg bg-gray-50 p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16 dark:bg-gray-800"
  >
    <div class="lg:col-span-5 lg:mt-0">
      <a href="#">
        <img
          class="mb-4 h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg"
          alt="peripherals"
        />
        <img
          class="mb-4 hidden md:h-full dark:block"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components-dark.svg"
          alt="peripherals"
        />
      </a>
    </div>
    <div class="me-auto place-self-center lg:col-span-7">
      <h1
        class="mb-3 text-2xl leading-tight font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white"
      >
        {$t("homepage.welcome")}
      </h1>
      <p
        class="mb-6 text-gray-500 dark:text-gray-400"
        class:invisible={verified}
      >
        {$t("homepage.please_verify_email")}
      </p>
      <a
        href="/admin/events/create"
        class="focus:ring-primary-300 dark:focus:ring-primary-900 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium focus:ring-4 {verified
          ? 'bg-primary-700 hover:bg-primary-800 text-white'
          : 'pointer-events-none bg-gray-100 text-gray-600 dark:hover:bg-gray-600'}"
      >
        {$t("homepage.start_creating_event")}
      </a>
    </div>
  </div>
</section>
