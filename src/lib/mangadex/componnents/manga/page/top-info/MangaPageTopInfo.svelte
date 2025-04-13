<script lang="ts">
	import { readable, writable, type Readable } from "svelte/store";
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
	import {
		ContentRating,
		type MangaStatus,
		type ReadingState,
		type ReadingStatus
	} from "@mangadex/gql/graphql";
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
	import ContentRatingTag from "@mangadex/componnents/content-rating/ContentRatingTag.svelte";
	import { MangaDownloadState } from "@mangadex/download/manga";

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
		downloading: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	interface Props {
		id: string;
		title: string;
		altTitle?: string | undefined;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		authors: Author[];
		tags: Tag[];
		status: MangaStatus;
		year?: number | undefined;
		reading_status?: Readable<ReadingStatus | undefined>;
		isFollowing?: Readable<boolean | undefined>;
		rating?: Readable<number | undefined>;
		downloadState?: Readable<MangaDownloadState>;
		stats?: TopMangaStatistics | undefined;
		contentRating?: ContentRating;
	}

	let {
		id = $bindable(),
		title,
		altTitle = undefined,
		coverImage,
		coverImageAlt,
		authors,
		tags = $bindable(),
		status = $bindable(),
		year = $bindable(undefined),
		reading_status = writable<ReadingStatus | undefined>(undefined),
		isFollowing = writable<boolean | undefined>(undefined),
		rating = writable<number | undefined>(undefined),
		downloadState = readable(MangaDownloadState.Pending),
		stats = $bindable(undefined),
		contentRating = ContentRating.Safe
	}: Props = $props();

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
	{#snippet cover()}
		<div class="cover-image">
			<TopInfoCover />
		</div>
	{/snippet}
	<div class="content">
		<section class="top">
			<h1>{title}</h1>
			{#if altTitle}
				<h2>{altTitle}</h2>
			{/if}
		</section>
		<section class="bottom">
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
				on:downloading={({ detail }) => {
					dispatch("downloading", detail);
				}}
			/>
			<div class="tag-status">
				<TagComponnentsFlex
					{tags}
					on:click={({ detail }) => {
						dispatch("tag", detail);
					}}
				>
					{#snippet pre()}
						<ContentRatingTag {contentRating} />
					{/snippet}
				</TagComponnentsFlex>
				<MangaStatusComp {status} {year} />
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
		</section>
	</div>
</TopInfoLayout>

<style lang="scss">
	section.top {
		display: grid;
		margin-top: 18px;
		gap: 16px;
		h1 {
			display: -webkit-box;
			-webkit-line-clamp: 1;
			line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
			font-size: 40px;
			margin: 0px;
			padding: 0px;
		}
		h2 {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			margin: 0px;
		}
	}
	div.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		section.bottom {
			display: flex;
			flex-direction: column;
			height: 60%;
			gap: 10px;
		}
	}
</style>
