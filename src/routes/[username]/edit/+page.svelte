<script lang="ts">
  import { page } from "$app/stores";
  import UserLink from "$lib/components/UserLink.svelte";
  import SortableList from "$lib/components/SortableList.svelte"
  import { db, userData, user } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { progress, userClicked } from "$lib/stores/progress";
  import { writable } from "svelte/store";

  const icons = [
    "twitter",
    "youtube",
    "tiktok",
    "linkedin",
    "github",
    "custom",
  ];

  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };

  const formData = writable(formDefaults);

  let showForm = false;

  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = urlIsValid && titleIsValid;

  function sortList(e: CustomEvent) {
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }
  
  async function addLink(e: SubmitEvent) {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      icon: "custom",
      title: "",
      url: "https://",
    });

    showForm = false;
  }

  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }
</script>

<main class="w-full max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <h1 class="text-2xl font-bold mb-4 text-center">
      edit profile
    </h1>
    <div>
    <!-- TODO: click to copy -->
      <p class="font-bold mb-1">profile link (click to copy)</p>
      <p class="mb-8 text-accent">http://localhost:5173/{$userData?.username}</p>
    </div>
    <a
      href="/login/photo">
        <button 
        class="btn btn-sm btn-outline mb-4"
        on:click={() => {userClicked.set(true); progress.set(1);}}
        >
          change photo
        </button>
    </a>
    <p class="border rounded-lg border-dashed my-4 p-4 max-w-64 mx-auto">
      drag and drop links to reorder
    </p>    
    <!-- NOTE: if there are issues, re add
    let:index
    slot prop, and uncomment slot on SortableList.svelte -->
    <!-- TODO: add private/public toggle -->
    <SortableList 
      list={$userData?.links} 
      on:sort={sortList} 
      let:item 
    >
      <div class="group relative">
        <UserLink {...item} />
        <button
          on:click={() => deleteLink(item)}
          class="btn btn-xs btn-secondary invisible group-hover:visible transition-all absolute -right-6 bottom-10"
          >delete</button
        >
      </div>
    </SortableList>

    {#if showForm}
      <form
        on:submit|preventDefault={addLink}
        class="bg-secondary p-6 w-full mx-auto rounded-xl mt-4 mb-12"
      >
        <div class="flex justify-between flex-col sm:flex-row">
          <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
          >
            <!-- TODO: icons change order. use keyed each block? -->
            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="title"
            class="input input-sm my-2 sm:my-0"
            bind:value={$formData.title}
          />
          <!-- TODO: why is input highlighted after text added? -->
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />
      </div>
        <!-- TODO: style this better -->
        <!-- <div class="my-4 text-left">
          {#if !titleIsValid || !urlIsValid}
            <span class="font-bold text-xs text-primary-content">invalid </span>
            {#if !titleIsValid && !urlIsValid}
              <span class="font-bold text-xs text-primary-content">title & URL</span>
            {:else if !titleIsValid}
              <span class="font-bold text-xs text-primary-content">title</span>
            {:else if !urlIsValid}
              <span class="font-bold text-xs text-primary-content">URL</span>
            {/if}
          {/if}
          {#if formIsValid}
            <span class="font-bold text-xs text-primary-content">nailed it!</span>
          {/if}
        </div> -->
        <!-- TODO: style this better -->
        <div class="flex justify-between mt-4 flex-col sm:flex-row">
          <div class="flex flex-col sm:flex-row">
            <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-sm mb-2 sm:mb-0">add link</button
            >
            <div>
              {#if !titleIsValid || !urlIsValid}
                <span class="font-bold text-xs text-primary-content ml-2">invalid </span>
                {#if !titleIsValid && !urlIsValid}
                  <span class="font-bold text-xs text-primary-content">title & URL</span>
                {:else if !titleIsValid}
                  <span class="font-bold text-xs text-primary-content">title</span>
                {:else if !urlIsValid}
                  <span class="font-bold text-xs text-primary-content">URL</span>
                {/if}
              {/if}
              {#if formIsValid}
                <span class="font-bold text-xs text-primary-content ml-2">nailed it!</span>
              {/if}
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-neutral mt-2 sm:mt-0" on:click={cancelLink}>cancel</button>
        </div>
      </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="btn btn-outline block mx-auto my-4"
        >
          add a link
        </button>
    {/if}
  {/if}
</main>