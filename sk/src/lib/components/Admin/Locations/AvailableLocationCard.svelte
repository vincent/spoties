<script>
    import { Button, Card, P } from "flowbite-svelte";
    import { PlusCircleIcon } from "lucide-svelte";

    let { location, addLocation } = $props();
</script>

<Card>
    <div>
        <span class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{location.name}</span>
        <P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">{location.description}</P>
    </div>
    <Button class="mt-6 w-fit" onclick={() => addLocation(location)}>
        Select <PlusCircleIcon class="w-6 h-6 ms-2 text-white" />
    </Button>
</Card>
