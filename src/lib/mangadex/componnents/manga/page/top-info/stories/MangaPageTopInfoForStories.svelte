<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "../buttons/readingStatus";
	import { writable, type Readable, type Writable } from "svelte/store";
	import type { Author } from "..";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { MangaStatus, ReadingStatus } from "@mangadex/gql/graphql";
	import MangaPageTopInfo from "../MangaPageTopInfo.svelte";

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
	let reading_status: Writable<ReadingStatus | undefined> = writable<ReadingStatus | undefined>(
		undefined
	);
	let isFollowing: Writable<boolean | undefined> = writable<boolean | undefined>(undefined);
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
	{description}
	{reading_status}
	{isFollowing}
	on:readingStatus={({ detail }) => {
		reading_status.set(detail.readingStatus);
		isFollowing.set(detail.isFollowing);
	}}
/>
