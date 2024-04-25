<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch} from "firebase/firestore";
  import { progress, userClicked } from "$lib/stores/progress";

  let username = "";
  let loading = false;
  let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;

  // validates username format
  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  // use reactive declarations responsibly, can create hard to track down bugs
  $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading

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
    }, 600);
  }

  async function confirmUsername() {
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), { 
      username, 
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: 'I am Enya',
      links: [
        {
          title: 'Test Link',
          url: 'https://enya.com',
          icon: 'custom'
        }
      ]
    });

    await batch.commit();

    username = '';
    isAvailable = false;

  }
  

</script>

<AuthCheck>
    {#if $userData?.username}
        <p class="text-lg">
            your username is <span class="font-bold underline">{$userData?.username}</span>
        </p>
        <p class="text-sm mb-3">&gt; usernames cannot be changed &lt;</p>
        <a class="btn" href="/login/photo" on:click={() => {userClicked.set(true); progress.set(1);}}>upload profile image</a>
    {:else}
        <h1 class="card-title">choose a username</h1>
        <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
            <input
                type="text"
                placeholder="username"
                class="input w-full text-base-content"
                bind:value={username}
                on:input={checkAvailability}
                class:input-error={(!isValid && isTouched)}
                class:input-warning={isTaken}
                class:input-success={isAvailable && isValid && !loading}
                />

            <p class="my-3">
                {#if !isTouched}
                    input username to check availability
                {:else if !isValid} 
                    <!-- TODO: be more descriptive without breaking layout -->
                    username is invalid
                {:else if loading}
                    checking availability of <span class="font-bold underline">{username}</span>
                {:else if isTaken}
                    <span class="font-bold underline">{username}</span> is not available
                {:else if isValid}
                    <span class="font-bold underline">{username}</span> is available
                {/if}
            </p>
                {#if isAvailable && isValid && !isTaken && !loading}
                    <button class="btn w-60">confirm choice</button>
                {:else}
                    <!-- TODO: restyle disabled state -->
                    <button class="btn w-60" disabled>confirm choice</button>
                {/if}
        </form>
    {/if}
</AuthCheck>