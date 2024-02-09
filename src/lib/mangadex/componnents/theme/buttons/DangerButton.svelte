<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";
	import Default from "./danger/Default.svelte";

    export let variant: "default" | "1" | "2" = "default";
    createEventDispatcher<{
        click: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement
        }
    }>();
    export let type: "reset" | "submit" | "button" = "button";
    export let style: string | undefined = undefined;
</script>

{#if variant == "1"}
    <L1 on:click {type} {style}>
        <slot/>
    </L1>
{:else if variant == "2"}
    <L2 on:click {type} {style}>
        <slot/>
    </L2>
{:else}
    <Default on:click {type} {style}>
        <slot/>
    </Default>
{/if}