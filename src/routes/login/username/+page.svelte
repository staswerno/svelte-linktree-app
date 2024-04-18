<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch} from "firebase/firestore";

  let username = "";
  let loading = false;
  let isAvailable = false;

  let debounceTimer: NodeJS.Timeout;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);

    loading = true;

    debounceTimer = setTimeout(async () => {
        console.log("checking availability of", username);
        
        const ref = doc(db, "usernames", username);
        const exists = await getDoc(ref).then((doc) => doc.exists());

        isAvailable = !exists;
        loading = false;

    }, 500);
  }

  async function confirmUsername() {
    // TODO
  }

</script>

<AuthCheck>
    <h1 class="card-title">choose a username</h1>
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
        <input
          type="text"
          placeholder="username"
          class="input w-full text-base-content"
          bind:value={username}
          on:input={checkAvailability}
        />

    <p class="my-3">
        {#if username}
            {#if isAvailable}
                @{username} is available
            {:else}
                @{username} is not available
            {/if}
        {:else}
            input username to check availability
        {/if}
    </p>
        <!-- make inactive if no input/username unavailable -->
        <button class="btn w-60">confirm choice</button>
      </form>
</AuthCheck>