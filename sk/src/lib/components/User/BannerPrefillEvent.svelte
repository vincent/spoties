<script>
    import { Banner } from "flowbite-svelte";
    import { UserCircle } from "lucide-svelte";
	import { t } from "$lib/i18n";
    const { username } = $props();
</script>
<Banner>
    <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
    <span class="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600">
        <UserCircle class="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </span>
    <span>
        <span>{@html $t('event.banner_1', {username})}
        <span>{$t('event.banner_2')}
    </span>
    </p>
</Banner>
