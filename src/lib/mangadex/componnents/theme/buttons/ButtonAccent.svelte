<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import L1 from "./accents/L1.svelte";
	import L2 from "./accents/L2.svelte";
	import L3 from "./accents/L3.svelte";
	import L4 from "./accents/L4.svelte";
	import L5 from "./accents/L5.svelte";
	import Default from "./accents/Default.svelte";
	import Accent from "./accents/Accent.svelte";
	import AccentAlt from "./accents/AccentAlt.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		isBase?: boolean;
		children?: import("svelte").Snippet;
		disabled?: boolean;
	}

	let {
		variant = "default",
		type = "button",
		style = undefined,
		isBase = false,
		children,
		disabled
	}: Props = $props();
</script>

{#if variant == "1"}
	<L1 on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</L1>
{:else if variant == "2"}
	<L2 on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</L2>
{:else if variant == "3"}
	<L3 on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</L3>
{:else if variant == "4"}
	<L4 on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</L4>
{:else if variant == "5"}
	<L5 on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</L5>
{:else if variant == "accent"}
	<Accent on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</Accent>
{:else if variant == "accent-alt"}
	<AccentAlt {disabled} on:click {style} {type} {isBase}>
		{@render children?.()}
	</AccentAlt>
{:else}
	<Default on:click {disabled} {style} {type} {isBase}>
		{@render children?.()}
	</Default>
{/if}
