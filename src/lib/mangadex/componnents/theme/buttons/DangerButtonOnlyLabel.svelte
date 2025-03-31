<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import DangerButton from "./DangerButton.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "default" | "1" | "2";
		type?: "reset" | "submit" | "button";
		label: string;
		style?: string | undefined;
		isBase?: boolean;
		disabled?: boolean;
	}

	let {
		variant = "default",
		type = "button",
		label,
		style = undefined,
		isBase = false,
		disabled
	}: Props = $props();
</script>

<DangerButton on:click {variant} {style} {type} {isBase} {disabled}>
	{label}
</DangerButton>
