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
		children?: import('svelte').Snippet;
	}

	let { variant = "blue", children }: Props = $props();
</script>

{#if variant == "blue"}
	<Blue on:click>
		{@render children?.()}
	</Blue>
{/if}
