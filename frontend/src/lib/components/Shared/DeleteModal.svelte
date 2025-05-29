<script>
  import { t } from "$lib/i18n";
  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  let {
    // provided by <Modals />
    isOpen,
    close,

    // your props
    message = $t("act.delete_ask"),
    yes = $t("act.delete_yes"),
    no = $t("act.delete_no"),
    confirm = null,
  } = $props();
</script>

<Modal open size="xs" autoclose outsideclose>
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
    <Button type="button" color="alternative" onclick={() => (isOpen = false)}
      >{no}</Button
    >
  </div>
</Modal>
