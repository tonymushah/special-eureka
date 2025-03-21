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

<ButtonBase {isBase} --button-color={"var(--status-gray)"} {style} on:click {type} {disabled}>
	{@render children?.()}
</ButtonBase>
