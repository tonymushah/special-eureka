<script lang="ts">
	import { MangaDownloadState } from "@mangadex/download/manga";
	import type { MangaStatus, ReadingStatus } from "@mangadex/gql/graphql";
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
	let downloadState = writable(MangaDownloadState.Done);
</script>

<MangaPageTopInfo
	closeDialogOnAdd
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
	onreadingStatus={(detail) => {
		reading_status.set(detail.readingStatus);
		isFollowing.set(detail.isFollowing);
	}}
	onrating={(detail) => {
		rating.set(detail);
	}}
	ondownload={() => {
		downloadState.set(MangaDownloadState.Downloading);
		setTimeout(
			() => {
				if (Math.floor(Math.random() * 10) % 2) {
					downloadState.set(MangaDownloadState.Done);
				} else {
					downloadState.set(MangaDownloadState.Error);
				}
			},
			Math.floor(Math.random() * 10) * 1000
		);
	}}
	ondelete={() => {
		downloadState.set(MangaDownloadState.Pending);
	}}
/>
