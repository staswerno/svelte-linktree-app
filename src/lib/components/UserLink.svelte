<script>
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'some cool title';
</script>

<a href={url} class="stack w-full max-w-md text-center bg-accent flex justify-center items-center p-4 rounded-lg not-prose no-underline">
    <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
    <span class="text-lg text-accent-content font-bold">{title}</span>
</a>

<!-- formatting checked -->
 