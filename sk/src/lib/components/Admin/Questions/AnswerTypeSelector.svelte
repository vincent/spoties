<script lang="ts">
    import { AlignJustify, Calendar1Icon, CheckIcon, ClipboardCheckIcon, EditIcon, HourglassIcon, ListTodoIcon, PenLineIcon, RulerIcon, StarIcon, TextIcon, UserPenIcon } from "lucide-svelte";
    import { Button, Dropdown, DropdownItem, Helper } from "flowbite-svelte";
    import { ChevronDownOutline, ChevronRightOutline } from "flowbite-svelte-icons";
    import { t } from "$lib/i18n";
    import type { QuestionType } from "$lib/domain/questions";

    let { divClass= '', updateAnswerType, value = $bindable<QuestionType>() } = $props()
    let open = $state(false)
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
          <DropdownItem class="min-w-50" onclick={() => select('private_name')}>{$t(`event.form.question_type_private_name`)}</DropdownItem>
          <DropdownItem class="min-w-50" onclick={() => select('private_age')}>{$t(`event.form.question_type_private_age`)}</DropdownItem>
          <DropdownItem class="min-w-50" onclick={() => select('private_address')}>{$t(`event.form.question_type_private_address`)}</DropdownItem>
        </Dropdown>

        <DropdownItem class="flex items-center justify-between">
          <AlignJustify class="mr-2" size="16" /> {$t(`event.form.text`)}
          <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
        </DropdownItem>
        <Dropdown placement="right-start">
          <DropdownItem onclick={() => select('simple_text')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><EditIcon class="mx-2" size="16" /> {$t(`event.form.question_type_simple_text`)}</span>
            <Helper class="ps-8">Write a short text</Helper>
          </DropdownItem>
          <DropdownItem onclick={() => select('rich_text')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><TextIcon class="mx-2" size="16" /> {$t(`event.form.question_type_rich_text`)}</span>
            <Helper class="ps-8">Write a long formatted text</Helper>
          </DropdownItem>
        </Dropdown>

        <DropdownItem class="flex items-center justify-between">
          <ListTodoIcon class="mr-2" size="16" /> {$t(`event.form.choice`)}
          <ChevronRightOutline class="ml-auto w-6 h-6 ms-2 text-primary-700 dark:text-white" />
        </DropdownItem>
        <Dropdown placement="right-start">
          <DropdownItem onclick={() => select('yes_no')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> {$t(`event.form.question_type_yes_no`)}</span>
            <Helper class="ps-8">Either "yes" or "no" </Helper>
          </DropdownItem>
          <DropdownItem onclick={() => select('select_one')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> {$t(`event.form.question_type_select_one`)}</span>
            <Helper class="ps-8">Choose one option among multiple values</Helper>
          </DropdownItem>
          <DropdownItem onclick={() => select('select_many')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> {$t(`event.form.question_type_select_many`)}</span>
            <Helper class="ps-8">Choose one or more options among multiple selectable values</Helper>
          </DropdownItem>
          <DropdownItem onclick={() => select('checkboxes')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><ClipboardCheckIcon class="mx-2" size="16" /> {$t(`event.form.question_type_checkboxes`)}</span>
            <Helper class="ps-8">Choose one or more options among multiple visible values</Helper>
          </DropdownItem>
        </Dropdown>

        <DropdownItem onclick={() => select('range')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><RulerIcon class="mx-2" size="16" /> {$t(`event.form.question_type_range`)}</span>
            <Helper class="ps-8">Choose a value in a range</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('rating')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><StarIcon class="mx-2" size="16" /> {$t(`event.form.question_type_rating`)}</span>
            <Helper class="ps-8">Rate between 1 and 5</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('date')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><Calendar1Icon class="mx-2" size="16" /> {$t(`event.form.question_type_date`)}</span>
            <Helper class="ps-8">Choose a date</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('time')} class="min-w-50 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><HourglassIcon class="mx-2" size="16" /> {$t(`event.form.question_type_time`)}</span>
            <Helper class="ps-8">Choose a time</Helper>
        </DropdownItem>
    </Dropdown>
</div>