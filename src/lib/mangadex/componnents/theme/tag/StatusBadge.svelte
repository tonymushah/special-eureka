<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface Props extends HTMLButtonAttributes {
		color: StatusColor;
	}

	let { color, ...restProps }: Props = $props();
</script>

{#if color == "blue"}
	<Blue {...restProps} />
{:else if color == "gray"}
	<Gray {...restProps} />
{:else if color == "green"}
	<Green {...restProps} />
{:else if color == "purple"}
	<Purple {...restProps} />
{:else if color == "red"}
	<Red {...restProps} />
{:else if color == "yellow"}
	<Yellow {...restProps} />
{/if}
