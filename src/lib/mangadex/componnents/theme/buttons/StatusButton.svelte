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
		children?: import("svelte").Snippet;
		disabled?: boolean;
	}

	let {
		color,
		type = "button",
		style = undefined,
		isBase = false,
		children,
		disabled
	}: Props = $props();
</script>

{#if color == "blue"}
	<Blue on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Blue>
{:else if color == "gray"}
	<Gray on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Gray>
{:else if color == "green"}
	<Green on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Green>
{:else if color == "purple"}
	<Purple on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Purple>
{:else if color == "red"}
	<Red on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Red>
{:else if color == "yellow"}
	<Yellow on:click {type} {style} {isBase} {disabled}>
		{@render children?.()}
	</Yellow>
{/if}
