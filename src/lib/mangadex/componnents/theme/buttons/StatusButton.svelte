<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	export let color: StatusColor;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let style: string | undefined = undefined;
	export let isBase = false;
</script>

{#if color == "blue"}
	<Blue on:click {type} {style} {isBase}>
		<slot />
	</Blue>
{:else if color == "gray"}
	<Gray on:click {type} {style} {isBase}>
		<slot />
	</Gray>
{:else if color == "green"}
	<Green on:click {type} {style} {isBase}>
		<slot />
	</Green>
{:else if color == "purple"}
	<Purple on:click {type} {style} {isBase}>
		<slot />
	</Purple>
{:else if color == "red"}
	<Red on:click {type} {style} {isBase}>
		<slot />
	</Red>
{:else if color == "yellow"}
	<Yellow on:click {type} {style} {isBase}>
		<slot />
	</Yellow>
{/if}
