<script>
    import { Card } from "flowbite-svelte";
    let { onclick } = $props();
</script>

<Card>
    <button type="button" {onclick}>
        <div class="text-center text-8xl text-gray-400">+</div>
        <div class="text-center text-2xl text-gray-400">New location</div>
    </button>
</Card>
