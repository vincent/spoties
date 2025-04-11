<script lang="ts">
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";
  import { AdminEventStore } from "$lib/stores/admin-event-form";
  import { activityStore } from "$lib/components/Spinner.svelte";
  import { goto } from "$app/navigation";

  const { data } = $props();

  AdminEventStore.set(data.record)
</script>

<EventForm locations={data.locations} />
