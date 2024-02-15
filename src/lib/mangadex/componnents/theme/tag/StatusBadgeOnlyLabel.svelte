<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import StatusBadge from "./StatusBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let color: StatusColor;
	export let label: string;
</script>

<StatusBadge on:click {color}>
	{label}
</StatusBadge>
