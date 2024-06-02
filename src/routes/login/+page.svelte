<script lang="ts">
  // for larger projects, better to define sign in logic
  // in lib dir for use across multiple pages / limit
  // component complexity

  import { auth, user, loggedIn } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  import { progress, userClicked } from "$lib/stores/progress"

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
  
  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

{#if $user && $loggedIn}
  <h1 class="card-title">welcome, {$user.displayName?.toLowerCase()}</h1>
  <p class="text-center mb-3">&gt; you are logged in &lt;</p>
  <a class="btn w-60" href="/login/username" on:click={() => {userClicked.set(true); progress.set(0.5);}}>choose username</a>
  <!-- client side sign out below -->
  <!-- <button class="btn w-60" on:click={() => signOut(auth)}>sign out</button> -->
  <!-- SSR sign out below -->
  <button class="btn w-60" on:click={signOutSSR}>sign out</button>
{:else} 
  <button class="btn w-60" on:click={signInWithGoogle}>sign in with google</button>
{/if}