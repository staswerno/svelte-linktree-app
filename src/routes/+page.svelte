<script>
    import { userData } from "$lib/firebase";

</script>

<svelte:head>
<title>linktasia - a paradise for links</title>
<meta name="description" content="link landing page project using sveltekit and firebase" />
</svelte:head>

<main class="flex w-full min-h-screen">
<!-- TODO: double check formatting on all pages -->
<div class="hero bg-base-200">
    <div class="hero-content text-center">
    <div class="w-full">
        <h1 class="text-7xl font-bold">linktasia</h1>
        <p class="py-6 text-2xl">a shareable home for all your favourite links</p>
        {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-primary">edit profile</a>
            <!-- TODO: add sign out button -->
        {:else}
            <a href="/login" class="btn btn-primary">create profile</a>
            <!-- TODO: add example profile - make it fun | set up specific email? -->
            <a href="/shadowheart" class="btn btn-secondary">example profile</a>
        {/if}
    </div>
    </div>
</div>

</main>