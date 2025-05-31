<script lang="ts">
  import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
  } from "flowbite-svelte";
  import { authModel, client } from "../../pocketbase";
  import { CupSoda, LogOut } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { t } from "$lib/i18n";

  const logout = () => {
    client.authStore.clear();
    goto("/login");
  };
</script>

{#if $authModel}
  <Avatar
    id="user-drop"
    src={client.files.getURL($authModel, $authModel.avatar)}
    class="ms-3 cursor-pointer"
  />
  <Dropdown simple triggeredBy="#user-drop">
    <DropdownHeader>
      <span class="block text-sm">{$authModel.name}</span>
      <span class="block truncate text-sm font-medium">{$authModel.email}</span>
    </DropdownHeader>
    <DropdownItem class="w-full" href="/me/"
      >{$t("menu.user_settings")}</DropdownItem
    >
    <DropdownItem
      class="w-full"
      href="https://ko-fi.com/vlkofi"
      target="_blank"
    >
      <div class="flex items-center justify-between">
        <span>{@html $t("act.support")}</span>
        <CupSoda class="text-primary-500 ms-3" />
      </div>
    </DropdownItem>
    <DropdownDivider />
    <DropdownItem class="w-full">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div onclick={logout} class="flex items-center justify-between">
        <span>{$t("login.logout")}</span>
        <LogOut />
      </div>
    </DropdownItem>
  </Dropdown>
{:else}
  <Button outline class="ms-4" href="/login">{$t("login.login")}</Button>
{/if}
