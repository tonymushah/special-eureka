<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import MidToneButton from "./MidToneButton.svelte";

	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let style: string | undefined = undefined;
	export let label: string;
	export let isBase = false;
</script>

<MidToneButton {type} {style} on:click {isBase}>
	{label}
</MidToneButton>
