<script lang="ts">
	import { ChapterDownload } from "@mangadex/download/chapter";
	import type { Snippet } from "svelte";
	import { derived as storeDerived } from "svelte/store";

	interface Props {
		haveBeenRead: boolean;
		state?: Snippet;
		flagReadingState?: Snippet;
		titleGroups?: Snippet;
		dateUploader?: Snippet;
		readingNumberComments?: Snippet;
		id: string;
	}
	let {
		haveBeenRead = $bindable(),
		state,
		flagReadingState,
		titleGroups,
		dateUploader,
		readingNumberComments,
		id
	}: Props = $props();
	const chapterDownload = new ChapterDownload(id);

	const download_state_images = chapterDownload.download_state_images();
</script>

<div
	class="layout"
	class:haveBeenRead
	class:hasImages={$download_state_images.hasImages}
	style="--status-left: {$download_state_images.left}; --status-right: {$download_state_images.right};"
>
	<div class="state">
		{#if state}
			{@render state()}
		{/if}
	</div>
	<div class="flag-reading-state">
		{#if flagReadingState}
			{@render flagReadingState()}
		{/if}
	</div>
	<div class="title-groups">
		{#if titleGroups}
			{@render titleGroups()}
		{/if}
	</div>
	<div class="date-uploader">
		{#if dateUploader}
			{@render dateUploader()}
		{/if}
	</div>
	<div class="reading-number-comments">
		{#if readingNumberComments}
			{@render readingNumberComments()}
		{/if}
	</div>
</div>

<style lang="scss">
	.layout.hasImages {
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--primary) 50%, var(--chapter-layout) 50%) var(--status-left),
			var(--chapter-layout) var(--status-right)
		);
	}
	.layout {
		background-color: var(--chapter-layout, transparent);
		display: grid;
		grid-template-areas: "state flag-reading-state title-groups date-uploader reading-number-comments";
		grid-template-columns: 25px 25px auto 125px 100px;
		column-gap: 20px;
		color: var(--text-color);
		padding: 5px;
		transition: background-color 300ms ease-in-out;
		border-radius: 0.15rem;
		width: -webkit-fill-available;
		.state {
			grid-area: state;
		}
		.flag-reading-state {
			grid-area: flag-reading-state;
			width: fit-content;
		}
		.title-groups {
			grid-area: title-groups;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.date-uploader {
			grid-area: date-uploader;
		}
		.reading-number-comments {
			grid-area: reading-number-comments;
			align-items: center;
		}
	}
	.layout:hover {
		background-color: var(--chapter-layout-hover, transparent);
	}
	.layout:active {
		background-color: var(--chapter-layout-active, transparent);
	}
	.layout:not(.haveBeenRead) {
		border-style: solid;
		border-width: 0px 0px 0px 5px;
		border-color: var(--indication-blue);
	}
	.layout > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.state {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
