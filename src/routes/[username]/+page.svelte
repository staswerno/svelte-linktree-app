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
  
  <!-- TODO: add sign out / edit IF logged in -->
  {#if $userData?.username == $page.params.username}
    <a class="btn btn-outline btn-sm absolute right-6 top-6" href="/{$userData.username}/edit">back</a>
  {/if}
    <h1 class="text-6xl text-primary underline my-6">
      {data.username}
    </h1>
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto"
    />

    <p class="text-xl my-8">{data.bio}</p>
    <ul class="list-none p-0 flex flex-col items-center mb-12">
      {#each data.links as item}
        <li class="my-2 max-w-md w-full">
          <UserLink {...item} />
        </li>
      {/each}
    </ul>  
