<script lang="ts">
	import Blue from "./indication/Blue.svelte";
	import { createEventDispatcher } from "svelte";

	export let variant: "blue" = "blue";
	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let isBase = false;
	export let style: string | undefined = undefined;
</script>

{#if variant == "blue"}
	<Blue {type} {style} on:click {isBase}>
		<slot />
	</Blue>
{/if}
