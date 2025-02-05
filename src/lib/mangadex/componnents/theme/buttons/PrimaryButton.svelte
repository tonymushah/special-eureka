<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import L1 from "./primary/L1.svelte";
	import L2 from "./primary/L2.svelte";
	import Default from "./primary/Default.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "default" | "1" | "2";
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		isBase?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		variant = "default",
		type = "button",
		style = undefined,
		isBase = false,
		children
	}: Props = $props();
</script>

{#if variant == "1"}
	<L1 on:click {type} {style} {isBase}>
		{@render children?.()}
	</L1>
{:else if variant == "2"}
	<L2 on:click {type} {style} {isBase}>
		{@render children?.()}
	</L2>
{:else}
	<Default on:click {type} {style} {isBase}>
		{@render children?.()}
	</Default>
{/if}
