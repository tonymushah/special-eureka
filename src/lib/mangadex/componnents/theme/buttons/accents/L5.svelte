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
		children?: import('svelte').Snippet;
	}

	let {
		type = "button",
		style = undefined,
		isBase = false,
		children
	}: Props = $props();
</script>

<ButtonBase
	--button-color="var(--accent-l5)"
	--button-hover="var(--accent-l5-hover)"
	--button-active="var(--accent-l5-active)"
	with_active
	with_hover
	{style}
	on:click
	{type}
	{isBase}
>
	{@render children?.()}
</ButtonBase>
