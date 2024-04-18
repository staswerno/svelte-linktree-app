<script>
        import { fly } from "svelte/transition";
        import { page } from "$app/stores";
</script>

{#key $page.url}
    <div in:fly={{ y: 400, duration: 600 }} >
        <slot />
    </div>
{/key}
