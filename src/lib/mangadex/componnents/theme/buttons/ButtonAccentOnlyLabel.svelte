<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ButtonAccent from "./ButtonAccent.svelte";

    export let variant: "default" | "1" | "2" | "3" | "4" | "5" = "default";
    createEventDispatcher<{
        click: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement
        }
    }>();
    export let type: "reset" | "submit" | "button" = "button";
    export let label: string;
    export let style: string | undefined = undefined;
</script>

<ButtonAccent on:click {variant} {style} {type}>
    {label}
</ButtonAccent>
