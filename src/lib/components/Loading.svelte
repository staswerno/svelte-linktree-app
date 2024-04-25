<script lang="ts">
    import { user, userData } from "$lib/firebase";
    import { onAuthStateChanged } from "firebase/auth";

    let isLoading = true; 

    // TODO: fix loading for logged out users
    $: {
        if ($userData !== null) {
            isLoading = false;
        }
    }
</script>

{#if isLoading}
        <div class="flex h-screen justify-center items-center text-center">
            <p>loading...</p>
        </div>
{:else}
    <slot />
{/if}