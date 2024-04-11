<script lang="ts">
    import { page } from "$app/stores";
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";

    let progress = tweened(0, {
		duration: 400,
        easing: cubicOut
	});

    let isUsernameRoute = false;
    let isPhotoRoute = false;
    let userClicked = false;

    $: {
        isUsernameRoute = $page.route.id?.includes("username") || false;
        isPhotoRoute = $page.route.id?.includes("photo") || false;

        if (!userClicked) {
            // re-initialises tweened so it doesn't animate on reload
            // better way of doing this?
            if (isUsernameRoute) {
            progress = tweened(0.5, {});
            } else if (isPhotoRoute) {
            progress = tweened(1, {});
            }
        }
    }

</script>

<nav class="flex justify-center md:block my-6 w-4/6 mx-auto">
    <ul class="flex flex-col md:flex-row justify-around">
        <a 
            href="/login"
            on:click={() => {userClicked = true; progress.set(0);}}>
                <button
                    class="btn w-40"
                    class:btn-primary={!isUsernameRoute && !isPhotoRoute}>
                    sign in
                </button>
        </a>
        <a
            href="/login/username"
            class="py-3 md:py-0"
            on:click={() => {userClicked = true; progress.set(0.5);}}>
                <button 
                    class="btn w-40"
                    class:btn-primary={isUsernameRoute}
                    >
                    choose username
                </button>
        </a>
        <a
            href="/login/photo"
            on:click={() => {userClicked = true; progress.set(1);}}>
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
    <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
        <div class="card-body items-center text-center">
            <slot />
        </div>
    </main>
</AnimatedRoute>