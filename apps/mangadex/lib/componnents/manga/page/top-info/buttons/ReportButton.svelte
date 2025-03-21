<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { createEventDispatcher } from "svelte";
	import ReportIcon from "./report/ReportIcon.svelte";

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
	<ReportIcon />
</ButtonAccent>
