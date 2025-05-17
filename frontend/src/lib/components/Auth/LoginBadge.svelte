<script lang="ts">
  import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-svelte";
  import { authModel, client } from "../../pocketbase";
  import { goto } from "$app/navigation";
  import Alerts from "../Alerts.svelte";
  import Dialog from "../Dialog.svelte";
    import { t } from "$lib/i18n";
    import { CupSoda, LogOut } from "lucide-svelte";

  const { signupAllowed = true } = $props();

  const logout = () => {
    client.authStore.clear();
    goto('/login')
  }
</script>

{#if $authModel}
  <Avatar id="user-drop" src={client.files.getURL($authModel, $authModel.avatar)} class="ms-3 cursor-pointer" />
  <Dropdown simple triggeredBy="#user-drop">
    <DropdownHeader>
      <span class="block text-sm">{$authModel.name}</span>
      <span class="block truncate text-sm font-medium">{$authModel.email}</span>
    </DropdownHeader>
    <DropdownItem>{$t('menu.user_settings')}</DropdownItem>
    <DropdownItem href="https://ko-fi.com/vlkofi" target="_blank">
      <div class="flex justify-between items-center">
        <span>{@html $t('act.support')}</span>
        <CupSoda class="text-primary-500" />
      </div>
    </DropdownItem>
    <DropdownDivider />
    <DropdownItem>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div onclick={logout} class="flex justify-between items-center">
        <span>{$t('login.logout')}</span>
        <LogOut />
      </div>
    </DropdownItem>
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
