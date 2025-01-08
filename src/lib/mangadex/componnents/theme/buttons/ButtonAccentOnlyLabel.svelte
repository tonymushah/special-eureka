<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import ButtonAccent from "./ButtonAccent.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
		type?: "reset" | "submit" | "button";
		label: string;
		style?: string | undefined;
		isBase?: boolean;
		oneLine?: boolean;
		icon?: ComponentType | undefined;
		noCenter?: boolean;
	}

	let {
		variant = "default",
		type = "button",
		label,
		style = undefined,
		isBase = false,
		oneLine = false,
		icon = undefined,
		noCenter = false
	}: Props = $props();
</script>

<ButtonAccent on:click {variant} {style} {type} {isBase}>
	{@const SvelteComponent = icon}
	<div class:noCenter>
		<SvelteComponent />
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
		overflow: hidden;
	}
</style>
