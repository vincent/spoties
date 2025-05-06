<script lang="ts">
  import EventForm from "$lib/components/Admin/Events/EventForm.svelte";  
  const { data } = $props();
</script>

<EventForm locations={data.locations} />