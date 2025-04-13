<script>
  import "../../../app.styles.forms.css";
  import EventView from "$lib/components/User/EventView.svelte";
  const { data } = $props();
</script>

<div class="mx-auto w-full max-w-(--breakpoint-xl) p-4 xl:p-0">
  <EventView record={data.record} userData={data.userAnswers} />
</div>
