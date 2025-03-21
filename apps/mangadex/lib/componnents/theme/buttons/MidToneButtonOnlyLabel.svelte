<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import MidToneButton from "./MidToneButton.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		type?: "reset" | "submit" | "button";
		style?: string | undefined;
		label: string;
		isBase?: boolean;
		disabled?: boolean;
	}

	let { type = "button", style = undefined, label, isBase = false, disabled }: Props = $props();
</script>

<MidToneButton {type} {style} on:click {isBase} {disabled}>
	{label}
</MidToneButton>
