<script lang="ts">
  import EventLocationRelease from "$lib/components/Admin/Events/EventLocationRelease.svelte";

  const { data } = $props();
</script>

<EventLocationRelease event={data.record} responses={data.responses} />
