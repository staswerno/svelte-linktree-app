<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import "../app.css";
</script>

<Loading>
  <div class="min-h-screen flex flex-col">
      <slot />
  </div>
</Loading>