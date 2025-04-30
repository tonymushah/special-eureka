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
	}

	let { variant = "default", ...restProps }: Props = $props();
</script>

{#if variant == "1"}
	<L1 {...restProps} />
{:else if variant == "2"}
	<L2 {...restProps} />
{:else if variant == "3"}
	<L3 {...restProps} />
{:else if variant == "4"}
	<L4 {...restProps} />
{:else if variant == "5"}
	<L5 {...restProps} />
{:else if variant == "accent"}
	<Accent {...restProps} />
{:else if variant == "accent-alt"}
	<AccentAlt {...restProps} />
{:else}
	<Default {...restProps} />
{/if}
