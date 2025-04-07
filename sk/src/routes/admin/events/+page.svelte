<script lang="ts">
  import { base } from "$app/paths";
  import DateShow from "$lib/components/DateShow.svelte";
  import Image from "$lib/pocketbase/Image.svelte";
  import Link2Modal from "$lib/components/Link2Modal.svelte";
  import { client } from "$lib/pocketbase";
  import Paginator from "$lib/pocketbase/Paginator.svelte";
  import Spinner, { activityStore } from "$lib/components/Spinner.svelte";
  import LoginGuard from "$lib/components/Auth/LoginGuard.svelte";

  const { data } = $props();
  const events = $derived(data.events);
  $effect(() => {
    data.metadata.title = data.metadata.headline = "Events";
  });
  const store = activityStore(() =>
    client.send("/api/generate", { method: "post" })
  );
</script>

<LoginGuard>
  <button type="button" onclick={store.run} disabled={$store}
    ><Spinner active={$store} />
    Generate a random post
  </button>
  {#snippet otherwise()}
    <p>Please Sign In to create/edit events.</p>
  {/snippet}
</LoginGuard>

<Paginator store={events} showIfSinglePage={true} />
{#each $events.items as item}
  <a href={`${base}/admin/events/${item.id}`} class="post">
    <DateShow date={item.updated} />
    <div>
      <div>
        <i class="bx bx-calendar" title="on date"></i>
        {new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(
          new Date(item.updated)
        )}
        {#if item.expand?.user?.name}
          <i class="bx bx-pen" title="author"></i>
          {item.expand.user.name}
        {/if}
      </div>
      <h2>{item.title}</h2>
    </div>
  </a>

{:else}
  <div>No location found. Create some !</div>
{/each}

<Paginator store={events} showIfSinglePage={true} />

<style lang="scss">
  .post {
    color: inherit;
    display: flex;
    gap: 1rem;
    padding-block: 1rem;
    & + .post {
      border-block-start: dashed 1px;
    }
  }
</style>
