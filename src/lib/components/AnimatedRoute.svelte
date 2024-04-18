<script>
        import { fly } from "svelte/transition";
        import { cubicOut } from 'svelte/easing';
        import { page } from "$app/stores";
</script>

{#key $page.url}
    <div in:fly={{ y: 400, duration: 600, easing: cubicOut }} >
        <slot />
    </div>
{/key}

<!-- TODO: remove unused imports -->
<!-- out:fade={{ duration: 100, easing: cubicOut } -->