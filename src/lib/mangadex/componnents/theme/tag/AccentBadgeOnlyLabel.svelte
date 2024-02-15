<script lang="ts">
	import AccentBadge from "./AccentBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	export let label: string;
	export let variant: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt" =
		"default";
</script>

<AccentBadge on:click {variant}>
	{label}
</AccentBadge>
