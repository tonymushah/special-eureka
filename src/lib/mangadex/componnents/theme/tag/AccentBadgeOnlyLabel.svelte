<script lang="ts">
	import AccentBadge from "./AccentBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	interface Props {
		label: string;
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
	}

	let { label, variant = "default" }: Props = $props();
</script>

<AccentBadge on:click {variant}>
	{label}
</AccentBadge>
