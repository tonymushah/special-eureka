<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let style: string | undefined = undefined;
</script>

{#if color == "blue"}
	<Blue on:click {type} {style}>
		<slot />
	</Blue>
{:else if color == "gray"}
	<Gray on:click {type} {style}>
		<slot />
	</Gray>
{:else if color == "green"}
	<Green on:click {type} {style}>
		<slot />
	</Green>
{:else if color == "purple"}
	<Purple on:click {type} {style}>
		<slot />
	</Purple>
{:else if color == "red"}
	<Red on:click {type} {style}>
		<slot />
	</Red>
{:else if color == "yellow"}
	<Yellow on:click {type} {style}>
		<slot />
	</Yellow>
{/if}
