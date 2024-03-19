<script lang="ts">
	import { writable, type Readable } from "svelte/store";
	import {
		setTopCoverAltContextStore,
		setTopCoverContextStore,
		setTopMangaReadingStatusContextStore,
		setTopMangaIsFollowingContextStore,
		setTopMangaTitleContextStore,
		setTopMangaRatingContextStore,
		setTopMangaDownloadContextStore
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
	export let description: string | undefined = undefined;
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
	<svelte:fragment>
		<h1>{title}</h1>
		{#if altTitle}
			<h2>{altTitle}</h2>
		{/if}
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
		/>
	</svelte:fragment>
</TopInfoLayout>
