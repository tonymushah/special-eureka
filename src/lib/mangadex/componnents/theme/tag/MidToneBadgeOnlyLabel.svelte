<script lang="ts">
	import MidToneBadge from "./MidToneBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<MidToneBadge on:click>
	{label}
</MidToneBadge>
