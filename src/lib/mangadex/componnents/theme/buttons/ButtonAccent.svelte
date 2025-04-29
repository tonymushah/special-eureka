<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Accent from "./accents/Accent.svelte";
	import AccentAlt from "./accents/AccentAlt.svelte";
	import Default from "./accents/Default.svelte";
	import L1 from "./accents/L1.svelte";
	import L2 from "./accents/L2.svelte";
	import L3 from "./accents/L3.svelte";
	import L4 from "./accents/L4.svelte";
	import L5 from "./accents/L5.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
		isBase?: boolean;
	}

	let { variant = "default", isBase = false, ...restProps }: Props = $props();
</script>

{#if variant == "1"}
	<L1 {isBase} {...restProps} />
{:else if variant == "2"}
	<L2 {isBase} {...restProps} />
{:else if variant == "3"}
	<L3 {isBase} {...restProps} />
{:else if variant == "4"}
	<L4 {isBase} {...restProps} />
{:else if variant == "5"}
	<L5 {isBase} {...restProps} />
{:else if variant == "accent"}
	<Accent {isBase} {...restProps} />
{:else if variant == "accent-alt"}
	<AccentAlt {isBase} {...restProps} />
{:else}
	<Default {isBase} {...restProps} />
{/if}
