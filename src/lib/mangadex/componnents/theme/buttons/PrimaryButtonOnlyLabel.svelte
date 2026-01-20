<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import PrimaryButton from "./PrimaryButton.svelte";
	import type { Component } from "svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "default" | "1" | "2";
		label: string;
		isBase?: boolean;
		oneLine?: boolean;
		icon?: Component | undefined;
		noCenter?: boolean;
	}

	let {
		variant = "default",
		label,
		isBase = false,
		oneLine,
		noCenter,
		icon,
		...restProps
	}: Props = $props();
</script>

<PrimaryButton {variant} {isBase} {...restProps}>
	{@const SvelteComponent = icon}
	<div class:noCenter>
		{#if SvelteComponent}
			<SvelteComponent />
		{/if}

		<span class:oneLine>
			{label}
		</span>
	</div>
</PrimaryButton>

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
