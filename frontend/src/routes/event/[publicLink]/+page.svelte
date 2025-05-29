<script lang="ts">
  import "../../../app.styles.base.css";
  import EventView from "$lib/components/User/EventView.svelte";
  import { type InputEventObject } from "$lib/pocketbase/types";
  const { data } = $props();

  data.metadata.title = data.record.title || "Untitled event";

  document.body.classList.add(data.record.theme || "default-theme");
</script>

<svelte:head>
  <title>{data.record.title || "Untitled"} | {data.config.site?.name}</title>
</svelte:head>

<div class="flex min-h-screen bg-gray-50 antialiased dark:bg-gray-900">
  <div class="mx-auto w-full max-w-(--breakpoint-xl) p-4 xl:p-0">
    <EventView
      record={data.record as InputEventObject}
      userData={data.userAnswers}
    />
  </div>
</div>
