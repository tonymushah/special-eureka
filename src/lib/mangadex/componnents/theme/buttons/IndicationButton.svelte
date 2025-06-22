<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Blue from "./indication/Blue.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "blue";
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "blue", isBase = false, ...restProps }: Props = $props();
</script>

{#if variant == "blue"}
	<Blue {isBase} {...restProps} />
{/if}
