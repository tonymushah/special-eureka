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
		children?: import("svelte").Snippet;
		disabled?: boolean;
	}

	let {
		variant = "blue",
		type = "button",
		isBase = false,
		style = undefined,
		children,
		disabled
	}: Props = $props();
</script>

{#if variant == "blue"}
	<Blue {type} {style} on:click {isBase} {disabled}>
		{@render children?.()}
	</Blue>
{/if}
