<script lang="ts">
// for larger projects, better to define sign in logic
// in lib dir for use across multiple pages / limit
// component complexity

import { auth, user } from "$lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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
  <h2 class="card-title">welcome, {$user.displayName?.toLowerCase()}</h2>
  <p class="text-center text-secondary font-semibold">you are logged in</p>
  <button class="btn btn-warning" on:click={() => signOut(auth)}>sign out</button>
{:else} 
  <button class="btn btn-primary" on:click={signInWithGoogle}>sign in with google</button>
{/if}