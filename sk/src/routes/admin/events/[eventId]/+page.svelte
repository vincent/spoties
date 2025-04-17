<script lang="ts">
  import EventLocationRelease from "$lib/components/Admin/Events/EventLocationRelease.svelte";
  import EventResponsesTable from "$lib/components/Admin/Events/EventResponsesTable.svelte";
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form";
  import { TabItem, Tabs } from "flowbite-svelte";

  const { data } = $props();

  AdminEventStore.set(data.record)
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl)">
  <Tabs tabStyle="underline" defaultClass="flex justify-center-safe">
    <TabItem open title="Form">
      <EventForm locations={data.locations} />
    </TabItem>
    <TabItem title="Responses">
      <EventResponsesTable event={data.record} responses={data.responses} />
    </TabItem>
    <TabItem title="Press">
      <EventLocationRelease event={data.record} responses={data.responses} />
    </TabItem>
  </Tabs>
</div>