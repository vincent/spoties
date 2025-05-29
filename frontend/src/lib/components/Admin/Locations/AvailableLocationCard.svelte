<script>
  import { Button, Card, P } from "flowbite-svelte";
  import { PlusCircleIcon } from "lucide-svelte";
  import { t } from "$lib/i18n";

  let { location, addLocation } = $props();
</script>

<Card>
  <div>
    <span
      class="text-lg leading-tight font-semibold text-gray-900 hover:underline dark:text-white"
      >{location.name}</span
    >
    <P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400"
      >{location.description}</P
    >
  </div>
  <Button class="mt-6 w-fit" onclick={() => addLocation(location)}>
    {$t("act.select")}
    <PlusCircleIcon class="ms-2 h-6 w-6 text-white" />
  </Button>
</Card>
