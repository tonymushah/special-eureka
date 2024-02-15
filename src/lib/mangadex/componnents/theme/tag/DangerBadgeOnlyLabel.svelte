<script lang="ts">
	import DangerBadge from "./DangerBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	export let type: "default" | "l1" | "l2" = "default";
	export let label: string;
</script>

<DangerBadge on:click {type}>
	{label}
</DangerBadge>
