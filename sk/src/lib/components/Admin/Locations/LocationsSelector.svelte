<script>
  let { available, value = $bindable() } = $props();

  let totalLocations = $derived(value?.length);
</script>

<section class="bg-white p-1 antialiased dark:bg-gray-900">
  <div class="md:gap-6 lg:flex lg:items-start xl:gap-8">
    <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      <div class="space-y-6">
        <!-- item -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800"
        >
        <div
            class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
          >
            <a href="#" class="shrink-0 md:order-1">
              <img
                class="h-20 w-20 dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="imac image"
              />
              <img
                class="hidden h-20 w-20 dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt="imac image"
              />
            </a>

            <div class="w-full min-w-0 flex-1 space-y-4 md:order-2">
              <a
                href="#"
                class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                >PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24"
                Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT</a
              >

              <div class="mt-2 flex items-center gap-4">
                <button
                  type="button"
                  class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    class="me-1.5 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Edit slots
                </button>

                <button
                  type="button"
                  class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  <svg
                    class="me-1.5 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- /item -->
      </div>

      <!-- available -->
      <div class="hidden xl:mt-8 xl:block">
        <h3 class="text-xl text-gray-900 dark:text-white">
          Available locations
        </h3>
        <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">

            <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <a href="#">
                    <div class="text-gray-400 text-center text-8xl">+</div>
                    <div class="text-gray-400 text-center text-2xl">New location</div>
                </a>
            </div>

            <!-- item -->
          <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div>
              <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27”</a>
              <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
            </div>
            <div class="mt-6 flex items-center gap-2.5">
              <button
                type="button"
                class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
              >+ Select</button>
            </div>
          </div>
          <!-- /item -->
        </div>
      </div>
    </div>

    <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div
        class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <p class="text-xl font-semibold text-gray-900 dark:text-white">
          Summary
        </p>

        <div class="space-y-4">
          <div class="space-y-2">
            <dl class="flex items-center justify-between gap-4">
              <dt
                class="text-base font-normal text-gray-500 dark:text-gray-400"
              >
                Locations
              </dt>
              <dd class="text-base font-medium text-gray-900 dark:text-white">
                {totalLocations}
              </dd>
            </dl>

            <dl class="flex items-center justify-between gap-4">
              <dt
                class="text-base font-normal text-gray-500 dark:text-gray-400"
              >
                Total spots
              </dt>
              <dd class="text-base font-medium text-green-600">15</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
