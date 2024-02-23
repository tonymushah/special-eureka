<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import StatusButton from "./StatusButton.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	export let color: StatusColor;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "reset" | "submit" | "button" = "button";
	export let style: string | undefined = undefined;
	export let label: string;
	export let isBase = false;
</script>

<StatusButton {isBase} {color} {type} on:click {style}>
	{label}
</StatusButton>
