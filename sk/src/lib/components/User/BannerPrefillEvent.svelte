<script>
    import { Banner } from "flowbite-svelte";
    import { UserCircle } from "lucide-svelte";
    const { username } = $props();
</script>
<Banner>
    <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
    <span class="inline-flex p-1 me-3 bg-gray-200 rounded-full dark:bg-gray-600">
        <UserCircle class="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </span>
    <span>
        Hi <span class="font-semibold">{username}</span>, Welcome back!<br>
        We already filled the form with your previous answers.
    </span>
    </p>
</Banner>
