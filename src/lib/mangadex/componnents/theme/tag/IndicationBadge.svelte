<script lang="ts">
	import Blue from "./indication/Blue.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let variant: "blue" = "blue";
</script>

{#if variant == "blue"}
	<Blue on:click>
		<slot />
	</Blue>
{/if}
