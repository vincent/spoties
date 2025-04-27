<script lang="ts">
  import { onDestroy } from "svelte";
  import { authModel, client } from "../../pocketbase";
  import Alerts, { alerts } from "../Alerts.svelte";
  import Dialog from "../Dialog.svelte";
    import { Avatar } from "flowbite-svelte";

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
      <button type="button" onclick={show}>
        <Avatar
          src={client.getFileUrl($authModel, $authModel.avatar)}
        />
      </button>
    {/snippet}
    <div class="wrapper">
      <Avatar
        src={client.getFileUrl($authModel, $authModel.avatar)}
      />
      <button type="button" onclick={logout}>Sign Out</button>
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
