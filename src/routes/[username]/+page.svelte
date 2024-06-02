<script lang="ts">
    import UserLink from '$lib/components/UserLink.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head>
    <title>{data.username} links</title>
    <meta name="description" content={data.bio} />
</svelte:head>
  
  <!-- TODO: improve navigation on this page 
      EG account/sign out button -->
  <main class="prose text-center w-full max-w-xl mx-auto mt-8 items-center">

    <h1 class="text-6xl text-primary underline mb-6">
      {data.username}
    </h1>
    <!-- TODO: remove this test comment -->
    <!-- TODO: add defaut user photo -->
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto"
    />

    <p class="text-xl my-8">{data.bio ?? "bio coming soon..."}</p>
    <ul class="list-none  p-0 flex flex-col items-center">
      {#each data.links as item}
        <li class="my-2 max-w-md w-full">
          <UserLink {...item} />
        </li>
      {/each}
    </ul>

</main>
  