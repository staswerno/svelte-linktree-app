<script lang="ts">
    import { userData, loggedIn } from "$lib/firebase";
    let loadingBalls = ['md', 'lg', 'md'];
    let isLoading = true; 

    // TODO: fix loading for logged out users
    $: {
        if ($userData !== null) {
            isLoading = false;
        }
    }
</script>

{#if $loggedIn && isLoading}
    <div class="flex h-screen justify-center items-center text-center">
        {#each loadingBalls as size}
            <span class={`loading loading-ball loading-${size}`}></span>
        {/each}
    </div>
{:else}
    <slot />
{/if}