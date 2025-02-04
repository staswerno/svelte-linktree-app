<script lang="ts">
    import { user, userData, loggedIn } from "$lib/firebase";
    import { writable, type Writable } from 'svelte/store';

    const loadingBalls: Writable<string[]> = writable(['md', 'lg', 'md']);
    let isLoading = true; 

    // TODO: fix loading for logged out users
    // IF the user is logged in 
    // AND there is no userData 
    // DON'T use loading component?
    $: {
        if ($userData !== null) {
            isLoading = false;
        }
    }

    // Ensure the store is properly initialized
    $: {
        if ($loadingBalls.length === 0) {
            loadingBalls.set(['md', 'lg', 'md']);
        }
    }
</script>

{#if $loggedIn && isLoading}
    <div class="flex h-screen justify-center items-center text-center">
        {#each $loadingBalls as size, i (size + i)}
            <span class={`loading loading-ball loading-${size} mx-1`}></span>
        {/each}
    </div>
{:else}
    <slot />
{/if}

<!-- formatting checked -->
 