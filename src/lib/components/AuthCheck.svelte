<script lang="ts">
    import { user } from "$lib/firebase";
    import { progress, userClicked } from "$lib/stores/progress";
</script>
  
{#if $user}
  <slot />
{:else}
    <p class="mb-3">you must be signed in to view this page</p>
    <!-- TODO: Reset progress bar on click -->
    <!-- by moving it to the main layout? -->
    <!-- or use a store? -->
    <a class="btn w-60" href="/login" on:click={() => {userClicked.set(true); progress.set(0);}}>sign in</a>
{/if}