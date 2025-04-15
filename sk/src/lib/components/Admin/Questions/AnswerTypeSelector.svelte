<script lang="ts">
    import { Button, Dropdown, DropdownItem, Helper } from "flowbite-svelte";
    import { ChevronDownOutline, TextSizeOutline } from "flowbite-svelte-icons";
    import { Calendar1Icon, CheckIcon, ClipboardCheckIcon, EditIcon, HourglassIcon, PenLineIcon, RadioIcon, StarIcon, TextCursorIcon, TextIcon } from "lucide-svelte";

    let { divClass, updateAnswerType, value = $bindable() } = $props()
    let open = $state(false)
    function select(v: string) {
        open = false
        updateAnswerType?.(v)
    }
</script>

<div class={divClass}>
    <Button class="w-full">{value || 'Answer type'}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
    <Dropdown {open} class="w-60 p-3 space-y-1 text-sm">
        <DropdownItem onclick={() => select('just_text')} class="border-b border-gray-200 rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><EditIcon class="mx-2" size="16" /> Just text</span>
            <Helper class="ps-8">A formatted text block</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('simple_text')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><EditIcon class="mx-2" size="16" /> Short text answer</span>
            <Helper class="ps-8">Write a short unformatted text</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('rich_text')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><TextIcon class="mx-2" size="16" /> Long text answer</span>
            <Helper class="ps-8">Write a long formatted text</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('yes_no')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> Yes / No</span>
            <Helper class="ps-8">Either "yes" or "no" </Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('select_one')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> Simple choice</span>
            <Helper class="ps-8">Choose one option among multiple values</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('select_many')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><CheckIcon class="mx-2" size="16" /> Multiple choices</span>
            <Helper class="ps-8">Choose one or more options among multiple selectable values</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('checkboxes')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><ClipboardCheckIcon class="mx-2" size="16" /> Checkboxes</span>
            <Helper class="ps-8">Choose one or more options among multiple visible values</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('range')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><PenLineIcon class="mx-2" size="16" /> Range</span>
            <Helper class="ps-8">Choose a value in a range</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('rating')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><StarIcon class="mx-2" size="16" /> Rating</span>
            <Helper class="ps-8">Rate between 1 and 5</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('date')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><Calendar1Icon class="mx-2" size="16" /> Date</span>
            <Helper class="ps-8">Choose a date</Helper>
        </DropdownItem>
        <DropdownItem onclick={() => select('time')} class="rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <span class="flex content-center"><HourglassIcon class="mx-2" size="16" /> Time</span>
            <Helper class="ps-8">Choose a time</Helper>
        </DropdownItem>
    </Dropdown>
</div>