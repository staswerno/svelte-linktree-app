<script>
        import { fade } from "svelte/transition";
        import { cubicOut } from 'svelte/easing';
        import { page } from "$app/stores";
</script>

{#key $page.url}
    <div in:fade={{ duration: 400, easing: cubicOut }}   >
        <slot />
    </div>
{/key}

<!-- TODO: remove unused imports -->