<script>
  let {
    title = `Let's write a nice title.`,
    description = `The first thing users will see is the title. It should be short and describing the subject.`,
    ...props
  } = $props()
</script>

<section {...props}>
  <div class="mx-auto max-w-screen-xl">
    <div class="max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{title}</h2>
      <p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">{description}</p>
    </div>
  </div>
</section>