<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import StatusButton from "./StatusButton.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		color: StatusColor;
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		label: string;
		isBase?: boolean;
		disabled?: boolean;
	}

	let {
		color,
		type = "button",
		style = undefined,
		label,
		isBase = false,
		disabled
	}: Props = $props();
</script>

<StatusButton {isBase} {color} {type} on:click {style} {disabled}>
	{label}
</StatusButton>
