<script lang="ts">
  // for larger projects, better to define sign in logic
  // in lib dir for use across multiple pages / limit
  // component complexity
  import SignOutButton from "$lib/components/SignOutButton.svelte";
  import { auth, user, userData, loggedIn } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  import { progress, userClicked } from "$lib/stores/progress"
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import Layout from "../+layout.svelte";

  export let data;

  const uid = data.uid;

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    // firebase issues json web token stored client side
    // allowing app to verify that user is logged in.
    // to use this, delete rest of function, and change
    // const credential to user
    // note: doesn't allow you to verify authentication
    // status on the server. if needed, use cookie based
    // authentication (see below)
    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    });
  }
</script>

<!-- TODO: How to make this wait? -->
<!-- ...add logic to the sign in button? -->
{#if $user && $loggedIn && !uid}
  <p class="text-center mb-3">&gt; your session has expired, please sign out &lt;</p>
  <SignOutButton classes={"w-60"}/>
{:else if $user && $loggedIn}
  <h1 class="card-title">welcome, {$user.displayName?.toLowerCase()}</h1>
  <p class="text-center mb-3">&gt; you are logged in &lt;</p>
  {#if !$userData?.username}
    <a class="btn w-60" href="/login/username" on:click={() => {userClicked.set(true); progress.set(0.5);}}>choose username</a>
  {:else}
    <!-- TODO: fix button. not working... sometimes? 
        is this because cookie expired?
        IF SO: make sure no cookie = logged out? -->
    <!-- TODO: fix button changing when logged in -->
    <a class="btn w-60" href="/{$userData.username}/edit">edit profile</a>
  {/if}
  <SignOutButton classes={"w-60"}/>
{:else} 
  <button class="btn w-60" on:click={signInWithGoogle}>sign in with google</button>
{/if}