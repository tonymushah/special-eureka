<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ButtonBase from "../base/ButtonBase.svelte";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		isBase?: boolean;
		children?: import("svelte").Snippet;
		disabled?: boolean;
	}

	let {
		type = "button",
		style = undefined,
		isBase = false,
		children,
		disabled
	}: Props = $props();
</script>

<ButtonBase
	--button-color="var(--accent)"
	--button-hover="var(--accent-hover)"
	--button-active="var(--accent-active)"
	with_active
	with_hover
	{style}
	on:click
	{type}
	{isBase}
	{disabled}
>
	{@render children?.()}
</ButtonBase>
