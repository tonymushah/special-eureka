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
	export let color: StatusColor;
</script>

{#if color == "blue"}
	<Blue on:click>
		<slot />
	</Blue>
{:else if color == "gray"}
	<Gray on:click>
		<slot />
	</Gray>
{:else if color == "green"}
	<Green on:click>
		<slot />
	</Green>
{:else if color == "purple"}
	<Purple on:click>
		<slot />
	</Purple>
{:else if color == "red"}
	<Red on:click>
		<slot />
	</Red>
{:else if color == "yellow"}
	<Yellow on:click>
		<slot />
	</Yellow>
{/if}
