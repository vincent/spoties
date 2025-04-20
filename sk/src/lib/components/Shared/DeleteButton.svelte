<script lang="ts">
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import DeleteModal from "./DeleteModal.svelte";
  import { Tooltip } from "flowbite-svelte";
  import { modals } from "svelte-modals";
  import { t } from "$lib/i18n";

  let { confirm, iconClass = '' } = $props()
</script>

<button
  type="button"
  class="ml-2 inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
  onclick={() => modals.open(DeleteModal, { confirm })}
  ><TrashBinOutline class={iconClass} /></button>
<Tooltip>{$t('act.delete')}</Tooltip>