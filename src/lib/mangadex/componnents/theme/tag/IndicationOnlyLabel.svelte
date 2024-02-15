<script lang="ts">
	import IndicationBadge from "./IndicationBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let variant: "blue" = "blue";
	export let label: string;
</script>

<IndicationBadge on:click {variant}>
	{label}
</IndicationBadge>
