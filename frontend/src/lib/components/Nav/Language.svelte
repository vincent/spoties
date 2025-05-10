<script lang="ts">
  import { localStore } from "$lib/stores/localstore.svelte";
  import { Dropdown, DropdownItem } from 'flowbite-svelte';
  import { LanguageOutline } from 'flowbite-svelte-icons';
  import { t, locale, locales } from '$lib/i18n';

  let storedLang = localStore('language', navigator ? navigator.language.split('-')[0] : 'en');
  if (storedLang?.value) $locale = storedLang.value as any;

  let isOpen = $state(false)
  const switchTo = (lang: string) => () => {
    storedLang.value = lang as any;
    $locale = lang as any;
    isOpen = false
  }
</script>

<button type="button" class="mx-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden rounded-lg text-sm p-2.5">
  <LanguageOutline class="lang-menu dark:text-white" />
  <Dropdown simple bind:isOpen triggeredBy=".lang-menu">
    {#each locales as l}
      <DropdownItem onclick={switchTo(l)}>{$t(`lang.${l}` as any)}</DropdownItem>    
    {/each}
  </Dropdown>
</button>