<script>
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
</script>

{#key $page.url}
    <div in:fly={{ y: 50, duration: 400 }} >
        <slot />
    </div>
{/key}

<!-- formatting checked -->
 