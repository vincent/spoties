<script lang="ts">
  import {
    ExclamationCircleOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";
  import { Button, Modal, Tooltip } from "flowbite-svelte";
  import { t } from "$lib/i18n";

  let {
    skip = false,
    iconClass = "",
    btnClass = "",
    size = "sm",
    message = $t("act.delete_ask"),
    yes = $t("act.delete_yes"),
    no = $t("act.delete_no"),
    text = $t("act.delete"),
    confirm,
  }: {
    skip?: boolean;
    confirm: () => any;
    iconClass?: string;
    size?: "sm" | "xl";
    btnClass?: string;
    message?: string;
    text?: string;
    yes?: string;
    no?: string;
  } = $props();
  let open = $state(false);
</script>

{#if size === "xl"}
  <button
    class="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
    onclick={() => (skip ? confirm() : (open = true))}>{text}</button
  >
{:else}
  <button
    type="button"
    class="text-primary-600 dark:text-primary-500 inline-flex items-center text-sm font-medium hover:underline {btnClass}"
    onclick={() => (skip ? confirm() : (open = true))}
    ><TrashBinOutline class={iconClass} /></button
  >
  <Tooltip>{text}</Tooltip>
{/if}

<Modal bind:open size="xs" autoclose outsideclose>
  <div class="text-center">
    <ExclamationCircleOutline
      class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
    />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      {message}
    </h3>
    <Button type="button" color="red" class="me-2" onclick={confirm}
      >{yes}</Button
    >
    <Button type="button" color="alternative" onclick={() => (open = false)}
      >{no}</Button
    >
  </div>
</Modal>
