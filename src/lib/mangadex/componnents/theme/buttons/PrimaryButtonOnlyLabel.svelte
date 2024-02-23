<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import PrimaryButton from "./PrimaryButton.svelte";

	export let variant: "default" | "1" | "2" = "default";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let label: string;
	export let style: string | undefined = undefined;
	export let isBase = false;
</script>

<PrimaryButton on:click {variant} {style} {type} {isBase}>
	{label}
</PrimaryButton>
