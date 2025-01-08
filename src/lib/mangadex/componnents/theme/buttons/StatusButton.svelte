<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		color: StatusColor;
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		isBase?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		color,
		type = "button",
		style = undefined,
		isBase = false,
		children
	}: Props = $props();
</script>

{#if color == "blue"}
	<Blue on:click {type} {style} {isBase}>
		{@render children?.()}
	</Blue>
{:else if color == "gray"}
	<Gray on:click {type} {style} {isBase}>
		{@render children?.()}
	</Gray>
{:else if color == "green"}
	<Green on:click {type} {style} {isBase}>
		{@render children?.()}
	</Green>
{:else if color == "purple"}
	<Purple on:click {type} {style} {isBase}>
		{@render children?.()}
	</Purple>
{:else if color == "red"}
	<Red on:click {type} {style} {isBase}>
		{@render children?.()}
	</Red>
{:else if color == "yellow"}
	<Yellow on:click {type} {style} {isBase}>
		{@render children?.()}
	</Yellow>
{/if}
