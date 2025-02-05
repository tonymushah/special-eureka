<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		color: StatusColor;
		children?: import('svelte').Snippet;
	}

	let { color, children }: Props = $props();
</script>

{#if color == "blue"}
	<Blue on:click>
		{@render children?.()}
	</Blue>
{:else if color == "gray"}
	<Gray on:click>
		{@render children?.()}
	</Gray>
{:else if color == "green"}
	<Green on:click>
		{@render children?.()}
	</Green>
{:else if color == "purple"}
	<Purple on:click>
		{@render children?.()}
	</Purple>
{:else if color == "red"}
	<Red on:click>
		{@render children?.()}
	</Red>
{:else if color == "yellow"}
	<Yellow on:click>
		{@render children?.()}
	</Yellow>
{/if}
