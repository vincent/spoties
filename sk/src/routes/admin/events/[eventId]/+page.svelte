<script>
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";
  const { data } = $props();
</script>

<EventForm record={data.record} />
