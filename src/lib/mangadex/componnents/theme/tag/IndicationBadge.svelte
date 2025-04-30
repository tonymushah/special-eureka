<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Blue from "./indication/Blue.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "blue";
	}

	let { variant = "blue", ...restProps }: Props = $props();
</script>

{#if variant == "blue"}
	<Blue {...restProps} />
{/if}
