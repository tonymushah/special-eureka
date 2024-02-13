<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import StatusButton from "./StatusButton.svelte";
	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let style: string | undefined = undefined;
	export let label: string;
</script>

<StatusButton {color} {type} on:click {style}>
	{label}
</StatusButton>
