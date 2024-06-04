<script lang="ts">
    import { page } from "$app/stores";
    import { progress, userClicked } from "$lib/stores/progress";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    import { user, userData, loggedIn } from "$lib/firebase";

    let isEditRoute = false;
    let isBioRoute = false;
 
    $: {
        isEditRoute = $page.route.id?.includes("edit") || false;
        isBioRoute = $page.route.id?.includes("bio") || false;
    }

</script>

<main class="text-center w-full max-w-xl mx-auto items-center">
    {#if isEditRoute || isBioRoute}
    <!-- TODO: add sign out button -->
    <nav class="flex justify-center md:block my-6 w-4/6 mx-auto">
        <ul class="flex flex-col md:flex-row justify-around">
            <a 
                href="/{$userData?.username}"
                >
                    <button
                        class="btn btn-neutral w-20"
                        >
                        view
                    </button>

            </a>
            <a
                href="/{$userData?.username}/edit"
                class="py-3 md:py-0"
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
    </nav>
    {/if}
    <slot />
</main>