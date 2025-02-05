<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import IndicationButton from "./IndicationButton.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "blue";
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		label: string;
		isBase?: boolean;
	}

	let {
		variant = "blue",
		type = "button",
		style = undefined,
		label,
		isBase = false
	}: Props = $props();
</script>

<IndicationButton {variant} {type} {style} on:click {isBase}>
	{label}
</IndicationButton>
