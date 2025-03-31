<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { createEventDispatcher } from "svelte";
	import ReadIcon from "./read/ReadIcon.svelte";

	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonAccent
	isBase
	on:click={({ detail }) => {
		dispatch("click", detail);
	}}
>
	<ReadIcon />
</ButtonAccent>
