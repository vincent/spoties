<script lang="ts">
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form.svelte";
  
  const { data } = $props();
  AdminEventStore.set(data.record)
</script>

<EventForm locations={data.locations} />