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
<nav class="text-center w-full max-w-xl mx-auto items-center m-8">
    <!-- <div class="w-1/4 items-start"></div> -->
    <!-- <div class="shrink-0 w-1/2"> -->
        <ul class="flex flex-row justify-around">
            <a 
                href="/{$userData?.username}"
                >
                    <button class="btn btn-neutral w-20">
                        view
                    </button>

            </a>
            <a
                href="/{$userData?.username}/edit"
                on:click={() => {userClicked.set(true); progress.set(0.5);}}>
                    <button 
                        class="btn w-20"
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
                        class="btn w-20"
                        class:btn-primary={isBioRoute}
                        class:btn-neutral={!isBioRoute}
                        >
                        bio
                    </button>
            </a>
        </ul>
    <!-- </div> -->
    <!-- <div class="w-1/4 justify-items-end">
        <SignOutButton classes={""}/>
    </div> -->
</nav>
{/if}
<main class="text-center w-full max-w-xl mx-auto items-center">
    <slot />
</main>