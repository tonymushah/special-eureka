<script lang="ts">
	import DangerBadge from "./DangerBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	interface Props {
		type?: "default" | "l1" | "l2";
		label: string;
	}

	let { type = "default", label }: Props = $props();
</script>

<DangerBadge on:click {type}>
	{label}
</DangerBadge>
