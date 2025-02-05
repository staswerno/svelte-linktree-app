<script lang="ts">
    import { flip } from "svelte/animate";
    import { createEventDispatcher } from "svelte";

    interface Item {
        id: string;
        index: number;
        [key: string]: any;
    }

    export let list: any[];
    let isOver: string | boolean = false;

    const dispatch = createEventDispatcher();

    function getDraggedParent(node: any): Item {
        if (!node.dataset.index) {
            return getDraggedParent(node.parentNode);
        } else {
            return { ...node.dataset } as Item;
        }
    }

    function onDragStart(e: DragEvent) {
    // @ts-ignore
        const dragged = getDraggedParent(e.target);
        e.dataTransfer?.setData("source", dragged?.index.toString());
    }

    function onDragOver(e: DragEvent) {
    // @ts-ignore
        const dragged = getDraggedParent(e.target);
        isOver = dragged?.id ?? false;
    }

    function onDragLeave(e: DragEvent) {
        const dragged = getDraggedParent(e.target);
        isOver === dragged.id && (isOver = false);
    }

    function onDrop(e: DragEvent) {
        isOver = false;
        const dragged = getDraggedParent(e.target);
        reorder({
            from: e.dataTransfer?.getData("source"),
            to: dragged.index,
        });
    }

    const reorder = ({ from, to }: any) => {
        const newList = [...list];
        // EXPLANATION: brackets evaluated first
        // brackets make to become from
        // new array on right becomes (oldto, newto)
        // then we assign oldto (using [0]) to oldfrom
        // it's a bit like:
        // newList = [1, oldfrom, 3, oldto, 5]
        // ... = [..., (update oldto with oldfrom)]...
        // newList = [1, oldfrom, 3, newto/oldfrom, 5]
        // then:
        // oldfrom = [oldto, newto][of these two items, update oldfrom with the first]
        // newList = [1, newfrom/oldto, 3, newto/oldfrom, 5]
        newList[from] = [newList[to], (newList[to] = newList[from])][0];

        dispatch("sort", newList);
    };
</script>

{#if list?.length}
    <ul class="list-none p-0 flex flex-col items-center">
        {#each list as item, index (item.id)}
            <li
                class="border-2 border-transparent p-2 transition-all max-w-md w-full"
                class:over={item.id === isOver}
                data-index={index}
                data-id={item.id}
                draggable="true"
                on:dragstart={onDragStart}
                on:dragover|preventDefault={onDragOver}
                on:dragleave={onDragLeave}
                on:drop|preventDefault={onDrop}
                animate:flip={{ duration: 300 }}
            >
                <slot {item}/>
                <!-- CLEANUP: are we actually using index? 
                if there are problems, use below instead of above 
                also, add back in
                let:index
                to component in username/edit-->
                <!-- <slot {item} {index} /> -->
            </li>
        {/each}
    </ul>
{:else}
    <p class="text-center my-12 text-lg font-bold">no items</p>
{/if}

<style>
    .over {
        @apply border-solid border-neutral-content rounded-lg ;
    }
  </style>

<!-- formatting checked -->
 