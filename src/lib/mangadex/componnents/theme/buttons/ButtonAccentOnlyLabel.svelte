<script lang="ts">
	import { type Component } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonAccent from "./ButtonAccent.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
		label: string;
		isBase?: boolean;
		oneLine?: boolean;
		icon?: Component | undefined;
		noCenter?: boolean;
		meltElement?: AnyMeltElement;
	}

	let {
		variant = "default",
		label,
		isBase = false,
		oneLine = false,
		icon = undefined,
		noCenter = false,
		...restProps
	}: Props = $props();
</script>

<ButtonAccent {variant} {isBase} {...restProps}>
	{@const SvelteComponent = icon}
	<div class:noCenter>
		{#if SvelteComponent}
			<SvelteComponent />
		{/if}

		<span class:oneLine>
			{label}
		</span>
	</div>
</ButtonAccent>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
	div.noCenter {
		justify-content: start;
	}
	.oneLine {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		overflow: hidden;
	}
</style>
