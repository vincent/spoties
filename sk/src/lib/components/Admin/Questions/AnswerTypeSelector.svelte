<script lang="ts">
  import { AlignJustify, Calendar1Icon, CheckIcon, ClipboardCheckIcon, EditIcon, HourglassIcon, ListIcon, ListTodoIcon, RulerIcon, StarIcon, TextIcon, UserPenIcon } from "lucide-svelte";
  import { ChevronDownOutline, ChevronRightOutline } from "flowbite-svelte-icons";
  import { Dropdown, DropdownItem, Helper } from "flowbite-svelte";
  import type { QuestionType } from "$lib/domain/questions";
  import { t } from "$lib/i18n";
    import AnswerTypeSelectorItem from "./AnswerTypeSelectorItem.svelte";

  let { open = false, divClass= '', updateAnswerType, value = $bindable<QuestionType>() } = $props()

  function select(v: QuestionType) {
    open = false
    updateAnswerType?.(v)
  }
</script>

<div class={divClass}>
  <button type="button" class="w-full text-center font-medium focus-within:ring-4 focus-within:outline-hidden inline-flex items-center justify-between px-5 py-2.5 text-sm text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg w-full">
    {value ? $t(`event.form.question_type_${value}` as any) : $t(`event.form.question_type`)}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
  </button>
  <Dropdown {open} class="w-60 p-3 space-y-1 text-sm">
    <DropdownItem onclick={() => select('just_text')} class="border-b border-gray-200 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
      <span class="flex content-center"><EditIcon class="mx-2" size="16" /> {$t(`event.form.question_type_just_text`)}</span>
      <Helper class="ps-8">A formatted text block</Helper>
    </DropdownItem>

    <DropdownItem class="flex items-center justify-between">
      <UserPenIcon class="mr-2" size="16" /> {$t(`event.form.personal_data`)}
      <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown placement="right-start">
      <AnswerTypeSelectorItem {select} key="private_name" />
      <AnswerTypeSelectorItem {select} key="private_age" />
      <AnswerTypeSelectorItem {select} key="private_address" />
    </Dropdown>

    <DropdownItem class="flex items-center justify-between">
      <AlignJustify class="mr-2" size="16" /> {$t(`event.form.text`)}
      <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown placement="right-start">
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
    <Dropdown placement="right-start">
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