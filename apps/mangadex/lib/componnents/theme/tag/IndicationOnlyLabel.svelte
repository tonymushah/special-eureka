<script lang="ts">
	import IndicationBadge from "./IndicationBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		variant?: "blue";
		label: string;
	}

	let { variant = "blue", label }: Props = $props();
</script>

<IndicationBadge on:click {variant}>
	{label}
</IndicationBadge>
