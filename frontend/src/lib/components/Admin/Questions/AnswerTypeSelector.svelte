<script lang="ts">
  import { AlignJustify, Calendar1Icon, CheckIcon, ClipboardCheckIcon, EditIcon, HourglassIcon, ListIcon, ListTodoIcon, RulerIcon, StarIcon, TextIcon, UserPenIcon } from "lucide-svelte";
  import { ChevronDownOutline, ChevronRightOutline } from "flowbite-svelte-icons";
  import { Button, Dropdown, DropdownDivider, DropdownItem, Helper } from "flowbite-svelte";
  import AnswerTypeSelectorItem from "./AnswerTypeSelectorItem.svelte";
  import type { QuestionType } from "$lib/pocketbase/types";
  import { t } from "$lib/i18n";

  let { open: isOpen = false, divClass= '', updateAnswerType, value = $bindable<QuestionType>() } = $props()

  function select(v: QuestionType) {
    isOpen = false
    updateAnswerType?.(v)
  }
</script>

<div class={divClass}>
  <Button outline={!!value} class="w-full flex justify-between">
    {value ? $t(`event.form.question_type_${value}` as any) : $t(`event.form.question_type`)}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
  </Button>
  <Dropdown simple placement="top" {isOpen} class="w-60 p-3 space-y-1 text-sm">
    <AnswerTypeSelectorItem {select} key="just_text" helper={"A formatted text block"}>
      <EditIcon class="mx-2" size="16" />
    </AnswerTypeSelectorItem>

    <DropdownDivider />

    <DropdownItem class="flex items-center justify-between">
      <UserPenIcon class="mr-2" size="16" /> {$t(`event.form.personal_data`)}
      <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown simple placement="right-start">
      <AnswerTypeSelectorItem {select} key="private_name" />
      <AnswerTypeSelectorItem {select} key="private_age" />
      <AnswerTypeSelectorItem {select} key="private_address" />
    </Dropdown>

    <DropdownDivider />

    <DropdownItem class="flex items-center justify-between">
      <AlignJustify class="mr-2" size="16" /> {$t(`event.form.text`)}
      <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown simple placement="right-start">
      <AnswerTypeSelectorItem {select} key="simple_text" helper={"Write a short text"}>
        <EditIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
      <AnswerTypeSelectorItem {select} key="rich_text" helper={"Write a long formatted text"}>
        <TextIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
    </Dropdown>

    <DropdownItem class="flex items-center justify-between">
      <ListTodoIcon class="mr-2" size="16" /> {$t(`event.form.choice`)}
      <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown simple placement="right-start">
      <AnswerTypeSelectorItem {select} key="yes_no" helper={`Either "yes" or "no"`}>
        <CheckIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
      <AnswerTypeSelectorItem {select} key="select_one" helper={`Choose one option among multiple values`}>
        <CheckIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
      <AnswerTypeSelectorItem {select} key="select_many" helper={`Choose one or more options among multiple selectable values`}>
        <ListIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
      <AnswerTypeSelectorItem {select} key="checkboxes" helper={`Choose one or more options among multiple visible values`}>
        <ClipboardCheckIcon class="mx-2" size="16" />
      </AnswerTypeSelectorItem>
    </Dropdown>

    <AnswerTypeSelectorItem {select} key="range" helper={`Choose a value in a range`}>
      <RulerIcon class="mx-2" size="16" />
    </AnswerTypeSelectorItem>
    <AnswerTypeSelectorItem {select} key="rating" helper={`Rate between 1 and 5`}>
      <StarIcon class="mx-2" size="16" />
    </AnswerTypeSelectorItem>
    <AnswerTypeSelectorItem {select} key="date" helper={`Choose a date`}>
      <Calendar1Icon class="mx-2" size="16" />
    </AnswerTypeSelectorItem>
    <AnswerTypeSelectorItem {select} key="time" helper={`Choose a time`}>
      <HourglassIcon class="mx-2" size="16" />
    </AnswerTypeSelectorItem>
  </Dropdown>
</div>