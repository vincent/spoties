<script lang="ts">
  import { t } from "$lib/i18n";
  import type { UsersResponse } from "$lib/pocketbase/generated-types";
  import { Tooltip } from "flowbite-svelte";
  import { BadgeCheckIcon } from "lucide-svelte";
  let {
    user,
    confirmed = false,
  }: { user: UsersResponse; confirmed?: boolean } = $props();
</script>

<span class="flex gap-1">
  {user.name}
  {#if !user.verified}
    <em class="cursor-default pb-2 align-super text-[10px] text-red-500">!</em>
    <Tooltip>{$t("data.not_verified_email")}</Tooltip>
  {/if}
  {#if confirmed}
    <BadgeCheckIcon size={16} class="text-green-700" />
    <Tooltip>{$t("act.confirmed")}</Tooltip>
  {/if}
</span>
