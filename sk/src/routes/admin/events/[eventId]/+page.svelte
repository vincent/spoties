<script lang="ts">
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form";

  const { data } = $props();

  AdminEventStore.set(data.record)
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl)">
    <EventForm locations={data.locations} />
</div>