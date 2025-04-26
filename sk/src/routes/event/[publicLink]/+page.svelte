<script>
  import "../../../app.styles.forms.css";
  import EventView from "$lib/components/User/EventView.svelte";
  const { data } = $props();

  data.metadata.title = data.record.title;
</script>

<svelte:head>
  <title>{data.record.title || 'Untitled'} | {data.config.site?.name}</title>
</svelte:head>

<div class="bg-gray-50 antialiased dark:bg-gray-900">
  <div class="w-full mx-auto max-w-(--breakpoint-xl) p-4 xl:p-0">
    <EventView record={data.record} userData={data.userAnswers} />
  </div>
</div>