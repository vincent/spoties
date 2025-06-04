<script lang="ts">
  import { localStore } from "$lib/stores/localstore.svelte";
  import { Dropdown, DropdownItem } from "flowbite-svelte";
  import { LanguageOutline } from "flowbite-svelte-icons";
  import { t, locale, locales } from "$lib/i18n";

  let browserLang = navigator?.language?.split("-")?.[0];
  if (!browserLang || !locales[browserLang]) browserLang = "en";

  let storedLang = localStore("language", browserLang);
  if (storedLang?.value) $locale = storedLang.value as any;

  let isOpen = $state(false);
  const switchTo = (lang: string) => () => {
    storedLang.value = lang as any;
    $locale = lang as any;
    isOpen = false;
  };
</script>

<button
  type="button"
  class="mx-2 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-hidden dark:text-gray-400 dark:hover:bg-gray-700"
>
  <LanguageOutline class="lang-menu dark:text-white" />
  <Dropdown class="lang-dropdown" simple bind:isOpen triggeredBy=".lang-menu">
    {#each locales as l}
      <DropdownItem class={`w-full to-${l}`} onclick={switchTo(l)}
        >{$t(`lang.${l}` as any)}</DropdownItem
      >
    {/each}
  </Dropdown>
</button>
