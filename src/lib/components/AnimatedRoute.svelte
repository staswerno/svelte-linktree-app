<script>
        import { fly, fade, blur, slide, scale, draw, crossfade } from "svelte/transition";
        import { quintIn, quintOut, backIn, backOut, circIn, circOut, expoIn, expoOut, sineIn, sineOut, linear } from 'svelte/easing';
        import { page } from "$app/stores";
</script>

{#key $page.url}
    <div in:blur={{ delay: 200, duration: 200, amount: 2, easing: sineIn }} out:blur={{ duration: 200, amount: 2, easing: sineOut }}  >
        <slot />
    </div>
{/key}

<!-- TODO: remove unused imports -->