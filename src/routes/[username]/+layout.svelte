<script lang="ts">
    import SignOutButton from "$lib/components/SignOutButton.svelte"
    import { page } from "$app/stores";
    import { progress, userClicked } from "$lib/stores/progress";
    import { userData } from "$lib/firebase";

    let isEditRoute = false;
    let isBioRoute = false;
 
    $: {
        isEditRoute = $page.route.id?.includes("edit") || false;
        isBioRoute = $page.route.id?.includes("bio") || false;
    }

</script>

{#if isEditRoute || isBioRoute}
<!-- TODO: fix sign out button -->
<!-- TODO: style this navbar :/  -->
<nav class="text-center w-full max-w-xl mx-auto items-center my-6">
    <!-- <div class="w-1/4 items-start"></div> -->
    <!-- <div class="shrink-0 w-1/2"> -->
        <SignOutButton classes={"absolute right-6 top-6 btn-outline"}/>
        <ul class="flex flex-row justify-center">
            <a 
                href="/{$userData?.username}"
                >
                    <button class="btn btn-neutral w-16 xs:w-20 mx-3 xs:mx-6">
                        view
                    </button>

            </a>
            <a
                href="/{$userData?.username}/edit"
                on:click={() => {userClicked.set(true); progress.set(0.5);}}>
                    <button 
                        class="btn w-16 xs:w-20 mx-3 xs:mx-6"
                        class:btn-primary={isEditRoute}
                        class:btn-neutral={!isEditRoute}
                        >
                        edit
                    </button>
            </a>
            <a
                href="/{$userData?.username}/bio"
                on:click={() => {userClicked.set(true); progress.set(1);}}>
                    <button
                        class="btn w-16 xs:w-20 mx-3 xs:mx-6"
                        class:btn-primary={isBioRoute}
                        class:btn-neutral={!isBioRoute}
                        >
                        bio
                    </button>
            </a>
        </ul>
    <!-- </div> -->
    <!-- <div class="w-1/4 justify-items-end">
        
    </div> -->
</nav>
{/if}
<main class="text-center w-full max-w-xl mx-auto items-center">
    <slot />
</main>