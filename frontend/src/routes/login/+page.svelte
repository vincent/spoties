<script>
    import LoginForm from "$lib/components/Auth/LoginForm.svelte";
    import { page } from '$app/stores';
    let returnUrl = $page.url.searchParams.get('return_url')
    let returnPath = returnUrl ? (new URL(returnUrl)).pathname : null
</script>

<main class="p-4 pt-20">
    <LoginForm returnUrl={returnPath} />
</main>