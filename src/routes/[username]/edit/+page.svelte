<script lang="ts">
    import { page } from "$app/stores";
    import UserLink from "$lib/components/UserLink.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";
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

  
    async function addLink(e: SubmitEvent) {
      const userRef = doc(db, "users", $user!.uid);
  
      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });
  
      formData.set({
        icon: "",
        title: "",
        url: "",
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
  <main class="max-w-xl mx-auto">
    {#if $userData?.username == $page.params.username}
      <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
        edit your profile
      </h1>

      <!-- INSERT sortable list here -->

      {#if showForm}
        <form
            on:submit|preventDefault={addLink}
            class="bg-secondary p-6 w-full mx-auto rounded-xl"
        >
            <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
            >

            {#each icons as icon}
                <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
            </select>
            <input
            name="title"
            type="text"
            placeholder="title"
            class="input input-sm"
            bind:value={$formData.title}
            />
            <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
            />
            <!-- TODO: style this better -->
            <!-- TODO: fix contrast on text -->
            <div class="my-4">
            {#if !titleIsValid || !urlIsValid}
              <span class="font-bold text-xs">invalid </span>
              {#if !titleIsValid && !urlIsValid}
                <span class="font-bold text-xs">title & URL</span>
              {:else if !titleIsValid}
                  <span class="font-bold text-xs">title</span>
              {:else if !urlIsValid}
                  <span class="font-bold text-xs">URL</span>
              {/if}
            {/if}
            {#if formIsValid}
                <span class="text-xs">nailed it!</span>
            {/if}
            </div>
            <!-- TODO: center these -->
            <button
            disabled={!formIsValid}
            type="submit"
            class="btn block">add a link</button
            >

            <button type="button" class="btn btn-xs my-4" on:click={cancelLink}>cancel</button>
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