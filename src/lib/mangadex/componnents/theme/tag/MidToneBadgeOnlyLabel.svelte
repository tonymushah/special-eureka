<script lang="ts">
	import MidToneBadge from "./MidToneBadge.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let label: string;
</script>

<MidToneBadge on:click>
	{label}
</MidToneBadge>
