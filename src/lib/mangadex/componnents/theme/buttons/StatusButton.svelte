<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends HTMLButtonAttributes {
		color: StatusColor;
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { color, isBase = false, ...restProps }: Props = $props();
</script>

{#if color == "blue"}
	<Blue {isBase} {...restProps} />
{:else if color == "gray"}
	<Gray {isBase} {...restProps} />
{:else if color == "green"}
	<Green {isBase} {...restProps} />
{:else if color == "purple"}
	<Purple {isBase} {...restProps} />
{:else if color == "red"}
	<Red {isBase} {...restProps} />
{:else if color == "yellow"}
	<Yellow {isBase} {...restProps} />
{/if}
