<script>
  import { Label, Input, Textarea } from "flowbite-svelte";
  import {
    ImageOutline,
    CodeOutline,
    FaceGrinOutline,
  } from "flowbite-svelte-icons";

  import { activityStore } from "$lib/components/Spinner.svelte";
  import { client } from "$lib/pocketbase";
    import LocationsSelector from "../Locations/LocationsSelector.svelte";

  const { record } = $props();

  const form = $state(record);
  const events = client.collection('events');
  const store = activityStore(async () =>
    await events.create(form)
  );
</script>

<h1 class="mb-4 text-3xl">{form.id ? 'Edit event' : 'Create a new event' }</h1>

<form onsubmit={store.run}>
  <div class="mb-6">
    <Label for="event-title" class="mb-2 block text-xl">Title</Label>
    <Input id="event-title" placeholder="The event title" bind:value={form.title}/>
  </div>

  <div class="mb-6">
    <Label for="event-description" class="mb-2 block text-xl">Description</Label>
    <Textarea
      id="event-description"
      bind:value={form.description}
      rows={8}
      placeholder="The event description"
    ></Textarea>
  </div>

  <div class="mb-6">
    <Label for="event-locations" class="mb-2 block text-xl">Locations</Label>
    <LocationsSelector available={[]} />
  </div>
</form>
