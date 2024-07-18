<script lang="ts">
    import UserLink from '$lib/components/UserLink.svelte';
    import type { PageData } from './$types';
    import { page } from "$app/stores";
    import { userData } from "$lib/firebase";

    
    export let data: PageData;
</script>

<svelte:head>
    <title>{data.username} links</title>
    <meta name="description" content={data.bio} />
</svelte:head>
  
  {#if $userData?.username == $page.params.username}
    <a class="btn btn-outline btn-sm absolute right-3 top-3" href="/{$userData.username}/edit">back</a>
  {/if}
  <h1 class="text-5xl sm:text-6xl text-primary underline mb-6 mt-10 sm:mt-6">
    {data.username}
  </h1>
  <!-- TODO: link image if no user image -->
  <!-- TODO: don't stretch image below 320 whilst maintaining CLS -->
  <div class="mx-6">
    <enhanced:img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      class="mx-auto w-auto h-64"
    />
  </div>

  <p class="text-xl my-8">{data.bio}</p>
  <ul class="list-none p-0 flex flex-col items-center mb-12 mx-3">
    {#each data.links as item}
      <li class="my-2 max-w-md w-full">
        <UserLink {...item} />
      </li>
    {/each}
  </ul>  

<style>
  /* img {
    width: auto;
    height: 256px;
  } */
</style>