<script lang="ts">
// for larger projects, better to define sign in logic
// in lib dir for use across multiple pages / limit
// component complexity

import { auth } from "$lib/firebase";
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

<button class="btn btn-primary btn-wide" on:click={signInWithGoogle}>sign in with google</button>