<script lang="ts">
    import { page } from "$app/stores";
    import { progress, userClicked } from "$lib/stores/progress";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    import { user, loggedIn } from "$lib/firebase";

    let isUsernameRoute = false;
    let isPhotoRoute = false;

    $: {
        isUsernameRoute = $page.route.id?.includes("username") || false;
        isPhotoRoute = $page.route.id?.includes("photo") || false;

        if (!$userClicked) {
            // re-initialises tweened so it doesn't animate on reload
            // better way of doing this?
            if (isUsernameRoute) {
            progress.set(0.5, {
                duration: 0
            });
            } else if (isPhotoRoute) {
            progress.set(1, {
                duration: 0
            });
            }
        }
    }
</script>

<nav class="flex justify-center md:block my-6 w-4/6 mx-auto">
    <ul class="flex flex-col md:flex-row justify-around">
        <!-- TODO: should this actually jump to the sign in page
            AND log someone out when in logged out state? -->
        <a 
            href="/login"
            on:click={() => {userClicked.set(true); progress.set(0);}}>
                <button
                    class="btn w-40"
                    class:btn-primary={!isUsernameRoute && !isPhotoRoute}>
                    sign {$user && $loggedIn ? "out" : "in"}
                </button>
        </a>
        <a
            href="/login/username"
            class="py-3 md:py-0"
            on:click={() => {userClicked.set(true); progress.set(0.5);}}>
                <button 
                    class="btn w-40"
                    class:btn-primary={isUsernameRoute}
                    >
                    choose username
                </button>
        </a>
        <a
            href="/login/photo"
            on:click={() => {userClicked.set(true); progress.set(1);}}>
                <button
                    class="btn w-40"
                    class:btn-primary={isPhotoRoute}
                    >
                    upload photo
                </button>
        </a>
    </ul>
</nav>

<div class="flex justify-center mb-6 w-4/6 px-24 mx-auto">
    <progress class="progress progress-primary w-full h-3" value={$progress} />
</div>

<AnimatedRoute>
    <main class="card w-4/6 bg-secondary text-primary-content mx-auto">
        <div class="card-body items-center text-center">
            <slot />
        </div>
    </main>
</AnimatedRoute>