<script lang="ts">
  let { responses, event } = $props();
</script>

<section class="bg-white p-8 antialiased">
  <div class="mx-auto grid max-w-screen-xl px-4 pb-8 my-50 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
    <div class="content-center justify-self-start md:col-span-7 md:text-start">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">{event.title}</h1>
    </div>
    <div class="hidden md:col-span-5 md:mt-0 md:flex">
      <img src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
    </div>
  </div>
  <div class="mx-auto px-4 max-w-screen-xl">
    {#each event.locations as l}
      <h2 class="mb-4 text-4xl font-extrabold leading-none">{@html l.label}</h2>
      {#each l.slots as s}
        <h3 class="mb-4 text-3xl font-extrabold leading-none">{@html s.label}</h3>
        <div class="flex border border-gray-200">
          {#each responses as r, i}
            {#if r.bookings.includes(s.id)}
              {r.user.name}
            {/if}
          {/each}
        </div>
      {/each}
    {/each}
  </div>
</section>
