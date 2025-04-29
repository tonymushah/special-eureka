<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Blue from "./indication/Blue.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "blue";
		isBase?: boolean;
	}

	let { variant = "blue", isBase = false, ...restProps }: Props = $props();
</script>

{#if variant == "blue"}
	<Blue {isBase} {...restProps} />
{/if}
