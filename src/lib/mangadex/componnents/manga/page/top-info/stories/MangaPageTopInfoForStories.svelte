<script lang="ts">
	import type { MangaStatus, ReadingStatus } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { writable, type Readable, type Writable } from "svelte/store";
	import type { Author } from "..";
	import MangaPageTopInfo from "../MangaPageTopInfo.svelte";
	import type { TopMangaStatistics } from "../stats";

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
		stats?: TopMangaStatistics | undefined;
	}

	let {
		id,
		title,
		altTitle = undefined,
		coverImage,
		coverImageAlt,
		authors,
		tags,
		status,
		year = undefined,
		stats = undefined
	}: Props = $props();
	let reading_status: Writable<ReadingStatus | undefined> = writable<ReadingStatus | undefined>(
		undefined
	);
	let isFollowing: Writable<boolean | undefined> = writable<boolean | undefined>(undefined);
	let rating: Writable<number | undefined> = writable(undefined);
	let downloadState = writable(ChapterDownloadState.NotDownloaded);
</script>

<MangaPageTopInfo
	{id}
	{title}
	{altTitle}
	{coverImage}
	{coverImageAlt}
	{authors}
	{tags}
	{status}
	{year}
	{reading_status}
	{isFollowing}
	{rating}
	{downloadState}
	{stats}
	on:readingStatus={({ detail }) => {
		reading_status.set(detail.readingStatus);
		isFollowing.set(detail.isFollowing);
	}}
	on:rating={({ detail }) => {
		rating.set(detail);
	}}
	on:download={() => {
		downloadState.set(ChapterDownloadState.Downloading);
		setTimeout(
			() => {
				if (Math.floor(Math.random() * 10) % 2) {
					downloadState.set(ChapterDownloadState.Downloaded);
				} else {
					downloadState.set(ChapterDownloadState.Failed);
				}
			},
			Math.floor(Math.random() * 10) * 1000
		);
	}}
	on:delete={() => {
		downloadState.set(ChapterDownloadState.NotDownloaded);
	}}
/>
