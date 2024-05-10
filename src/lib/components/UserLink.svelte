<script>
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'some cool title';
</script>

<!-- TODO: style this -->
<a href={url} class="stack w-full max-w-md text-center bg-secondary flex justify-center items-center p-4 rounded-lg not-prose no-underline">
    <!-- TODO: change icon url back to {`/${icon}.png`} -->
  <img src={`https://cdn3.iconfinder.com/data/icons/feather-5/24/moon-128.png`} alt={icon} width="32" height="32" class="w-8" />
  <span class="text-lg text-white font-bold">{title}</span>
</a>