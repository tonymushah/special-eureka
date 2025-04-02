<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		haveBeenRead: boolean;
		state?: Snippet;
		flagReadingState?: Snippet;
		titleGroups?: Snippet;
		dateUploader?: Snippet;
		readingNumberComments?: Snippet;
	}
	let {
		haveBeenRead = $bindable(),
		state,
		flagReadingState,
		titleGroups,
		dateUploader,
		readingNumberComments
	}: Props = $props();
</script>

<div class="layout" class:haveBeenRead>
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
