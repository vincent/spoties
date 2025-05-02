<script lang="ts">
  import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-svelte";
  import { authModel, client } from "../../pocketbase";
  import { goto } from "$app/navigation";
  import Alerts from "../Alerts.svelte";
  import Dialog from "../Dialog.svelte";
    import { t } from "$lib/i18n";

  const { signupAllowed = true } = $props();

  const logout = () => {
    client.authStore.clear();
    goto('/login')
  }
</script>

{#if $authModel}
  <Avatar id="user-drop" src={client.files.getURL($authModel, $authModel.avatar)} class="cursor-pointer" />
  <Dropdown triggeredBy="#user-drop">
    <DropdownHeader>
      <span class="block text-sm">{$authModel.name}</span>
      <span class="block truncate text-sm font-medium">{$authModel.email}</span>
    </DropdownHeader>
    <DropdownItem>{$t('menu.user_settings')}</DropdownItem>
    <DropdownDivider />
    <DropdownItem onclick={logout}>{$t('login.logout')}</DropdownItem>
  </Dropdown>
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
