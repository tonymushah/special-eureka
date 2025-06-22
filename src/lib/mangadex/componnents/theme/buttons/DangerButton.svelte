<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Default from "./danger/Default.svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "default" | "1" | "2";
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "default", isBase = false, ...restProps }: Props = $props();
</script>

{#if variant == "1"}
	<L1 {isBase} {...restProps} />
{:else if variant == "2"}
	<L2 {isBase} {...restProps} />
{:else}
	<Default {isBase} {...restProps} />
{/if}
