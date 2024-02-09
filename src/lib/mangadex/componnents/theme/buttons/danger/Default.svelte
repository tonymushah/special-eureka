<script lang="ts">
	import { createEventDispatcher } from "svelte";
    export let type: "reset" | "submit" | "button" = "button"
    createEventDispatcher<{
        click: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement
        }
    }>();
    export let style: string | undefined = undefined;
</script>

<button {style} on:click {type}>
    <slot/>
</button>

<style lang="scss">
    button {
        min-height: 3em;
        min-width: 3em;
        border-radius: .25rem;
        border: 0;
        padding-left: .75rem;
        padding-right: .75rem;
        transition: filter 100ms ease-in-out;
        display: flex;
        align-items: center;
        color: var(--text-color);
        background-color: var(--danger);
        font-family: var(--fonts);
    }
    button:hover {
        filter: brightness(90%);
    }
    button:active {
        filter: brightness(80%);
    }
</style>