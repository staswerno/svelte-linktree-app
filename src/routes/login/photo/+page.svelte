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
      <div class="form-control w-full max-w-xs my-3 sm:my-6 mx-auto text-center">
        <!-- TODO: change to enhanced:img -->
        <!-- TODO: fix CLS -->
        <!-- TODO: check enhanced:img resizing -->
        <enhanced:img
          src={previewURL ?? $userData?.photoURL ?? "/user.png"}
          alt="photoURL"
          class="mx-auto w-auto h-auto xs:h-36 sm:h-64 mb-6"
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
    <a {href} class="btn btn-primary"> edit profile </a>
</AuthCheck>