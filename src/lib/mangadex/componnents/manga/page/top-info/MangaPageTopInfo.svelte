<script lang="ts">
	import { writable, type Readable } from "svelte/store";
	import {
		setTopCoverAltContextStore,
		setTopCoverContextStore,
		setTopMangaReadingStatusContextStore,
		setTopMangaIsFollowingContextStore,
		setTopMangaTitleContextStore,
		setTopMangaRatingContextStore,
		setTopMangaDownloadContextStore,
		setTopMangaIdContextStore
	} from "./context";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { MangaStatus, ReadingState, ReadingStatus } from "@mangadex/gql/graphql";
	import TopInfoLayout from "./TopInfoLayout.svelte";
	import TopInfoCover from "./TopInfoCover.svelte";
	import type { Author } from "./index";
	import TopInfoAuthors from "./TopInfoAuthors.svelte";
	import TopInfoButtons from "./TopInfoButtons.svelte";
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import TagComponnentsFlex from "@mangadex/componnents/tag/TagComponnentsFlex.svelte";
	import MangaStatusComp from "./MangaStatus.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import type { TopMangaStatistics } from "./stats";
	import TopMangaStats from "./TopMangaStats.svelte";

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
		tag: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
		comments: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	export let id: string;
	export let title: string;
	export let altTitle: string | undefined = undefined;
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let authors: Author[];
	export let tags: Tag[];
	export let status: MangaStatus;
	export let year: number | undefined = undefined;
	export let reading_status: Readable<ReadingStatus | undefined> = writable<
		ReadingStatus | undefined
	>(undefined);
	export let isFollowing: Readable<boolean | undefined> = writable<boolean | undefined>(
		undefined
	);
	export let rating: Readable<number | undefined> = writable<number | undefined>(undefined);
	export let downloadState: Readable<ChapterDownloadState> = writable(
		ChapterDownloadState.NotDownloaded
	);
	export let stats: TopMangaStatistics | undefined = undefined;

	setTopMangaIdContextStore(id);
	setTopMangaTitleContextStore(title);
	setTopCoverContextStore(coverImage);
	setTopMangaReadingStatusContextStore(reading_status);
	setTopCoverAltContextStore(coverImageAlt);
	setTopMangaIsFollowingContextStore(isFollowing);
	setTopMangaRatingContextStore(rating);
	setTopMangaDownloadContextStore(downloadState);
</script>

<TopInfoLayout>
	<div class="cover-image" slot="cover">
		<TopInfoCover />
	</div>
	<div class="content">
		<div class="top">
			<h1>{title}</h1>
			{#if altTitle}
				<h2>{altTitle}</h2>
			{/if}
		</div>
		<div class="bottom">
			<TopInfoAuthors {authors} />
			<TopInfoButtons
				on:readingStatus={({ detail }) => {
					dispatch("readingStatus", detail);
				}}
				on:rating={({ detail }) => {
					dispatch("rating", detail);
				}}
				on:download={({ detail }) => {
					dispatch("download", detail);
				}}
				on:delete={({ detail }) => {
					dispatch("delete", detail);
				}}
				on:addToList={({ detail }) => {
					dispatch("addToList", detail);
				}}
				on:read={({ detail }) => {
					dispatch("read", detail);
				}}
				on:report={({ detail }) => {
					dispatch("report", detail);
				}}
				on:upload={({ detail }) => {
					dispatch("upload", detail);
				}}
			/>
			<div class="tag-status">
				<TagComponnentsFlex
					bind:tags
					on:click={({ detail }) => {
						dispatch("tag", detail);
					}}
				/>
				<MangaStatusComp bind:status bind:year />
			</div>
			{#if stats != undefined}
				<div class="stats">
					<TopMangaStats
						bind:stats
						on:commentClick={({ detail }) => {
							dispatch("comments", detail);
						}}
					/>
				</div>
			{/if}
		</div>
	</div>
</TopInfoLayout>

<style lang="scss">
	div.top {
		h1 {
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		h2 {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	}
	div.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		div.bottom {
			display: flex;
			flex-direction: column;
			height: 60%;
			gap: 10px;
		}
	}
</style>
