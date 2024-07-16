<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import ButtonAccent from "./ButtonAccent.svelte";

	export let variant: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt" =
		"default";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let label: string;
	export let style: string | undefined = undefined;
	export let isBase = false;
	export let oneLine = false;
	export let icon: ComponentType | undefined = undefined;
	export let noCenter = false;
</script>

<ButtonAccent on:click {variant} {style} {type} {isBase}>
	<div class:noCenter>
		<svelte:component this={icon} />
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
		gap: 10px;
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
