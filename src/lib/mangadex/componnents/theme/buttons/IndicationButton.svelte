<script lang="ts">
	import Blue from "./indication/Blue.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "blue";
		type?: "reset" | "submit" | "button";
		isBase?: boolean;
		style?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		variant = "blue",
		type = "button",
		isBase = false,
		style = undefined,
		children
	}: Props = $props();
</script>

{#if variant == "blue"}
	<Blue {type} {style} on:click {isBase}>
		{@render children?.()}
	</Blue>
{/if}
