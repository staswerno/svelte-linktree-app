<script lang="ts">
// for larger projects, better to define sign in logic
// in lib dir for use across multiple pages / limit
// component complexity

import { auth, user } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { progress, userClicked } from "$lib/stores/progress"

async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(provider)
    console.log(auth)
    // firebase issues json web token stored client side
    // allowing app to verify that user is logged in.
    // note: doesn't allow you to verify authentication
    // status on the server. if needed, use cookie based
    // authentication (to be implemented later)
    console.log(user)
}
</script>

{#if $user}
  <h1 class="card-title">welcome, {$user.displayName?.toLowerCase()}</h1>
  <p class="text-center mb-3">&gt; you are logged in &lt;</p>
  <a class="btn w-60" href="/login/username" on:click={() => {userClicked.set(true); progress.set(0.5);}}>choose username</a>
  <button class="btn w-60" on:click={() => signOut(auth)}>sign out</button>
{:else} 
  <button class="btn w-60" on:click={signInWithGoogle}>sign in with google</button>
{/if}