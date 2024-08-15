<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
  
    export let data: PageData;
</script>
  
<main class="max-w-lg prose text-center mx-auto w-full">
    <h1 class="mx-2 text-2xl font-bold mb-4 text-center">edit bio</h1>

    <p class="font-bold mb-1">current bio</p>
    <p class="mb-8"> {data.bio}</p>
    <form method="POST" use:enhance>
        <div class="form-control  mx-6">
            <label for="bio">
                <span class="sr-only">your bio</span>
            </label>
            <!-- TODO: select all text on selecting textarea -->
            <textarea
                name="bio"
                rows="4"
                class="textarea textarea-bordered textarea-accent w-full"
                value="update your bio here"
            />
        </div>
        <button class="btn btn-primary my-5">update bio</button>
    </form>
    <!-- TODO: test status code -->
    <p>Status Code: {$page.status}</p>
    <p class="font-bold">{$page.form?.problem ?? ""}</p>
</main>