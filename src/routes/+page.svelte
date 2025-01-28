<script>
    import { userData } from "$lib/firebase";

</script>

<svelte:head>
<title>linktasia - a paradise for links</title>
<meta name="description" content="link landing page project using sveltekit and firebase" />
</svelte:head>

<main class="flex w-full min-h-screen">
<!-- TODO: double check formatting on all pages -->
<!-- TODO: double check spacing on all elements -->
<!-- TODO: remove unused imports -->
<!-- TODO: remove "formatting checked" comments -->
<!-- TODO: fix unresponsive links when cookies expired -->

<div class="hero bg-base-200">
    <div class="hero-content text-center">
    <div class="w-full">
        <h1 class="text-7xl font-bold">linktasia</h1>
        <p class="py-6 text-2xl">a shareable home for all your favourite links</p>
        <!-- TODO: fix button text jumping -->
        {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-primary mr-3 w-36">edit profile</a>
            <!-- TODO: add sign out button -->
        {:else}
            <a href="/login" class="btn btn-primary mr-3 w-36">create profile</a>
        {/if}
            <!-- TODO: edit example profile - make it fun -->
        <a href="/shadowheart" class="btn btn-secondary ml-3 w-36">example profile</a>

    </div>
    </div>
</div>

</main>