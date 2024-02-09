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
        padding-left: 1rem;
        padding-right: 1rem;
        transition: background-color 100ms ease-in-out;
        box-shadow: none;
        display: flex;
        align-items: center;
        transition: background-color 300ms ease-in-out;
        color: var(--text-color);
        background-color: var(--accent-l5);
    }
    button:hover {
        background-color: var(--accent-l5-hover);
    }
    button:active {
        background-color: var(--accent-l5-active);
    }
</style>