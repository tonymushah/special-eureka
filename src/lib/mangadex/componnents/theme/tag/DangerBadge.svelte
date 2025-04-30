<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Default from "./danger/Default.svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "default" | "l1" | "l2";
	}

	let { variant = "default", ...restProps }: Props = $props();
</script>

{#if variant == "l1"}
	<L1 {...restProps} />
{:else if variant == "l2"}
	<L2 {...restProps} />
{:else}
	<Default {...restProps} />
{/if}
