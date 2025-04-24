<script>
  import "../../../app.styles.forms.css";
  import EventView from "$lib/components/User/EventView.svelte";
  const { data } = $props();

  data.metadata.title = data.record.title;
</script>

<svelte:head>
  <title>{data.record.title || 'Untitled'} | {data.config.site?.name}</title>
</svelte:head>

<div class="w-full mx-auto w-full max-w-(--breakpoint-xl) p-4 xl:p-0">
  <EventView record={data.record} userData={data.userAnswers} />
</div>
