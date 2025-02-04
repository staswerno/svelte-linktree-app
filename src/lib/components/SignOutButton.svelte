<script lang="ts">
  import { auth } from "$lib/firebase";
  import { signOut } from "firebase/auth";
  import { goto } from "$app/navigation";
  
  // set progress bar to 0
  async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
      goto("/login");
  }

  export let classes: string = "";
</script>

<!-- SSR sign out below -->
<button class={`btn ${classes}`} on:click={signOutSSR}>sign out</button>

<!-- client side sign out below -->
<!-- <button class="btn w-60" on:click={() => signOut(auth)}>sign out</button> -->

<!-- formatting checked -->
 