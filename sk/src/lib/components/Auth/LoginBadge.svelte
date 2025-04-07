<script lang="ts">
  import { onDestroy } from "svelte";
  import { authModel, client } from "../../pocketbase";
  import Alerts, { alerts } from "../Alerts.svelte";
  import Dialog from "../Dialog.svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte";

  const { signupAllowed = true } = $props();

  async function logout() {
    client.authStore.clear();
  }

  const unsubscribe = client.authStore.onChange((token, model) => {
    if (model) {
      const { name, username } = model;
      alerts.success(`Signed in as ${name || username || "Admin"}`, 5000);
    } else {
      alerts.success(`Signed out`, 5000);
    }
  }, false);

  onDestroy(() => unsubscribe());
</script>

{#if $authModel}
  <Dialog>
    {#snippet trigger(show)}
      <button onclick={show}>
        <Avatar
          size="size-10"
          src={client.getFileUrl($authModel, $authModel.avatar)}
          name={$authModel?.name || $authModel?.username || $authModel?.email}
        />
      </button>
    {/snippet}
    <div class="wrapper">
      <Avatar
        src={client.getFileUrl($authModel, $authModel.avatar)}
        name={$authModel?.name || $authModel?.username || $authModel?.email}
      />
      <button onclick={logout}>Sign Out</button>
    </div>
  </Dialog>
{:else}
  <Dialog>
    {#snippet trigger(show)}
      <a href="/login">
        {signupAllowed ? "Sign In / Sign Up" : "Sign In"}
      </a>
    {/snippet}
    <Alerts />
  </Dialog>
{/if}
