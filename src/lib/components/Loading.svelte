<script lang="ts">
    import { user, userData, loggedIn } from "$lib/firebase";
    let loadingBalls = ['md', 'lg', 'md'];
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
</script>

{#if $loggedIn && isLoading}
    <div class="flex h-screen justify-center items-center text-center">
        {#each loadingBalls as size}
            <!-- TODO: why is lg ball sometimes rendering as md? -->
            <span class={`loading loading-ball loading-${size}`}></span>
        {/each}
    </div>
{:else}
    <slot />
{/if}