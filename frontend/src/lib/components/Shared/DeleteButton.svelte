<script lang="ts">
  import { ExclamationCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";
  import { Button, Modal, Tooltip } from "flowbite-svelte";
  import { t } from "$lib/i18n";

  let {
    skip = false,
    iconClass = '',
    btnClass = '',
    message = $t('act.delete_ask'),
    yes = $t('act.delete_yes'),
    no = $t('act.delete_no'),
    confirm,
  }: {
    skip?: boolean,
    confirm: () => any,
    iconClass?: string,
    btnClass: string,
    message?: string,
    yes?: string,
    no?: string,
  } = $props()
  let open = $state(false)
</script>

<button
  type="button"
  class="inline-flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 {btnClass}"
  onclick={() => skip ? confirm() : (open = true)}
  ><TrashBinOutline class={iconClass} /></button>
<Tooltip>{$t('act.delete')}</Tooltip>

<Modal bind:open size="xs" autoclose outsideclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
    <Button type="button" color="red" class="me-2" onclick={confirm}>{yes}</Button>
    <Button type="button" color="alternative" onclick={() => open = false}>{no}</Button>
  </div>
</Modal>