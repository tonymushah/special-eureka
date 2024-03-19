<script lang="ts">
	import ReadingStatusButton from "./buttons/ReadingStatusButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import StarButton from "./buttons/StarButton.svelte";
	import DownloadButton from "./buttons/DownloadButton.svelte";
	import AddToListButton from "./buttons/AddToListButton.svelte";

	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
		rating: number;
		download: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		delete: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		addToList: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<div class="button-group">
	<ReadingStatusButton
		on:readingStatus={({ detail }) => {
			dispatch("readingStatus", detail);
		}}
	/>
	<DownloadButton
		on:delete={({ detail }) => {
			dispatch("delete", detail);
		}}
		on:download={({ detail }) => {
			dispatch("download", detail);
		}}
	/>
	<StarButton
		on:select={({ detail }) => {
			dispatch("rating", detail);
		}}
	/>
	<AddToListButton
		on:click={({ detail }) => {
			dispatch("addToList", detail);
		}}
	/>
</div>

<style lang="scss">
	.button-group {
		display: flex;
		gap: 10px;
	}
</style>
