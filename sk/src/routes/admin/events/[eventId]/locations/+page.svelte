<script>
    import EventLocationRelease from "$lib/components/Admin/Events/EventLocationRelease.svelte";

    const { data } = $props();
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl)">
    <EventLocationRelease event={data.record} />
</div>
