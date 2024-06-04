<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { user, userData, storage, db } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  let previewURL: string;
  let uploading = false;
  $: href = `/${$userData?.username}/edit`;

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
  }

</script>

<AuthCheck>
    <h1 class="card-title">upload a profile pic</h1>

    <form class="max-w-screen-md w-full">
      <div class="form-control w-full max-w-xs my-6 mx-auto text-center">
        <img
          src={previewURL ?? $userData?.photoURL ?? "/user.png"}
          alt="photoURL"
          width="256"
          height="256"
          class="mx-auto mb-6"
        />
        <label for="photoURL" class="label sr-only">
          pick a file
        </label>
        <input
          on:change={upload}
          name="photoURL"
          type="file"
          multiple={false}
          class="file-input file-input-bordered w-full max-w-xs text-white lowercase"
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
        {#if uploading}
        <div>
          <p class="mt-6">꩜ uploading ꩜</p>
          <progress class="progress  w-56 mt-6" />
        </div>
        {/if}
        </div>
    </form>
    <a {href} class="btn btn-primary"> finish </a>
</AuthCheck>