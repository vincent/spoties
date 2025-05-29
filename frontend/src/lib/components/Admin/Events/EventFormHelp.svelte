<script>
  import { t } from "$lib/i18n";
  import { Button } from "flowbite-svelte";

  let {
    title,
    description,
    disabled = false,
    next = undefined,
    ...props
  } = $props();
</script>

<section {...props}>
  <h2
    class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
  >
    {title}
  </h2>
  <div class="flex w-full items-start justify-between">
    <p class="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
      {description}
    </p>
    {#if next}
      <Button onclick={next} outline={disabled} {disabled}
        >{$t("act.next")}
      </Button>
    {/if}
  </div>
</section>
