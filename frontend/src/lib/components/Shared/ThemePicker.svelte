<script>
  import { t } from "$lib/i18n";
  import {
    Button,
    Dropdown,
    DropdownGroup,
    DropdownItem,
    Indicator,
    Input,
    Label,
    Radio,
    Toggle,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  let { value = $bindable() } = $props();
  let isOpen = $state();
</script>

<Button outline class="relative">
  {$t("event.form.choose_theme")}
  <ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" />
  <Indicator
    border
    size="xl"
    placement="top-right"
    class="text-xs font-bold {value}"
  >
    <div class="bg-primary-500 h-full w-full rounded-full"></div>
  </Indicator>
</Button>
<Dropdown bind:isOpen class="theme-picker {isOpen ? 'flex border-0' : ''}">
  <DropdownGroup class="w-1/4">
    <DropdownItem onclick={() => (value = "default")}>Default</DropdownItem>
    <DropdownItem onclick={() => (value = "emerald")}>Emerald</DropdownItem>
    <DropdownItem onclick={() => (value = "mariner")}>Mariner</DropdownItem>
    <DropdownItem onclick={() => (value = "vivid-violet")}>Violet</DropdownItem>
  </DropdownGroup>
  <DropdownGroup class="w-3/4 space-y-2 p-4 {value}">
    <Label>Preview</Label>
    <Input placeholder="Text input" />
    <Radio>Checked state</Radio>
    <Toggle checked={true}>Checked toggle</Toggle>
  </DropdownGroup>
</Dropdown>

<style>
  :global(.theme-picker ul) {
    border: none;
  }
</style>
