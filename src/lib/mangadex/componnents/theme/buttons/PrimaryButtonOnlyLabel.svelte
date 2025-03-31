<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import PrimaryButton from "./PrimaryButton.svelte";

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

<PrimaryButton on:click {variant} {style} {type} {isBase} {disabled}>
	{label}
</PrimaryButton>
