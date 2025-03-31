<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import StatusBadge from "./StatusBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		color: StatusColor;
		label: string;
	}

	let { color, label }: Props = $props();
</script>

<StatusBadge on:click {color}>
	{label}
</StatusBadge>
