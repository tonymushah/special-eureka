<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import IndicationButton from "./IndicationButton.svelte";

	export let variant: "blue" = "blue";
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

<IndicationButton {variant} {type} {style} on:click {isBase}>
	{label}
</IndicationButton>
