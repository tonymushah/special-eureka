<script lang="ts">
	import ReadingStatusButton from "./buttons/ReadingStatusButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import StarButton from "./buttons/StarButton.svelte";
	import DownloadButton from "./buttons/DownloadButton.svelte";
	import AddToListButton from "./buttons/AddToListButton.svelte";
	import ReadButton from "./buttons/ReadButton.svelte";
	import ReportButton from "./buttons/ReportButton.svelte";
	import UploadButton from "./buttons/UploadButton.svelte";

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
		read: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		report: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		upload: MouseEvent & {
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
	<ReadButton
		on:click={({ detail }) => {
			dispatch("read", detail);
		}}
	/>
	<ReportButton
		on:click={({ detail }) => {
			dispatch("report", detail);
		}}
	/>
	<UploadButton
		on:click={({ detail }) => {
			dispatch("upload", detail);
		}}
	/>
</div>

<style lang="scss">
	.button-group {
		display: flex;
		gap: 10px;
	}
</style>
