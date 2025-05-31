<script lang="ts">
  import { DarkMode } from "flowbite-svelte";
  import Language from "./Language.svelte";
  import type { Snippet } from "svelte";
  import LoginBadge from "../Auth/LoginBadge.svelte";
  let { children }: { children?: Snippet } = $props();
</script>

<nav
  class="border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
>
  <div class="flex items-start justify-between">
    <div class="mr-auto">{@render children?.()}</div>
    <Language />
    <DarkMode />
    <LoginBadge />
  </div>
</nav>
