<script lang="ts">
	import ChapterFeedElement1 from "@mangadex/componnents/chapter/feed/element1/ChapterFeedElement1WithReadableCoverAndDownloadState.svelte";
	import { CoverImageQuality, type RecentlyAddedHomeQuery } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import openTitle from "@mangadex/utils/links/title/[id]";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { getContextClient } from "@urql/svelte";
	import getChapterDownloadState from "./getChapterDownloadState";
	const client = getContextClient();
	interface Props {
		chapters: RecentlyAddedHomeQuery;
	}

	let { chapters }: Props = $props();
	let data = $derived(chapters.home.recentlyUploaded.data.map((c) => ({
		mangaId: c.relationships.manga.id,
		chapterId: c.id,
		download_state: getChapterDownloadState({
			id: c.id,
			client
		}),
		coverImage: get_cover_art({
			client,
			cover_id: c.relationships.manga.relationships.coverArt.id,
			filename: c.relationships.manga.relationships.coverArt.attributes.fileName,
			manga_id: c.relationships.manga.id,
			mode: CoverImageQuality.V256
		}),
		upload_date: new Date(c.attributes.readableAt),
		lang: c.attributes.translatedLanguage,
		uploader: {
			id: c.relationships.user.id,
			name: c.relationships.user.attributes.username,
			roles: c.relationships.user.attributes.roles
		},
		groups: c.relationships.scanlationGroups.map((v) => ({
			id: v.id,
			name: v.attributes.name
		})),
		mangaTitle:
			get_value_from_title_and_random_if_undefined(
				c.relationships.manga.attributes.title,
				"en"
			) ?? "",
		coverImageAlt: `${c.id}/${c.attributes.volume}`,
		chapterTitle: `${
			c.attributes.volume != null && c.attributes.volume != undefined
				? ` Vol. ${c.attributes.volume}`
				: ""
		}${
			c.attributes.chapter != null && c.attributes.chapter != undefined
				? ` Ch. ${c.attributes.chapter}`
				: ""
		}${
			c.attributes.title != null && c.attributes.title != undefined
				? ` ${c.attributes.title}`
				: ""
		}`
	})));
	let halfwayThrough = $derived(Math.floor(data.length / 2));

	let data1 = $derived(data.slice(0, halfwayThrough));
	let data2 = $derived(data.slice(halfwayThrough, data.length));
</script>

<div class="content">
	<div class="chapter-col data1">
		{#each data1 as { chapterId, mangaId, coverImage, upload_date, lang, uploader, groups, mangaTitle, chapterTitle, coverImageAlt, download_state } (chapterId)}
			<div class="chapter">
				<ChapterFeedElement1
					{mangaId}
					{chapterId}
					{download_state}
					{coverImage}
					{upload_date}
					{lang}
					{uploader}
					{groups}
					{mangaTitle}
					{coverImageAlt}
					{chapterTitle}
					on:mangaClick={() => {
						openTitle(mangaId);
					}}
				/>
			</div>
		{/each}
	</div>
	<div class="chapter-col data2">
		{#each data2 as { chapterId, mangaId, coverImage, upload_date, lang, uploader, groups, mangaTitle, chapterTitle, coverImageAlt, download_state } (chapterId)}
			<div class="chapter">
				<ChapterFeedElement1
					{mangaId}
					{chapterId}
					{download_state}
					{coverImage}
					{upload_date}
					{lang}
					{uploader}
					{groups}
					{mangaTitle}
					{coverImageAlt}
					{chapterTitle}
					on:mangaClick={() => {
						openTitle(mangaId);
					}}
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	:root {
		--layout-width: 100%;
	}
	div.chapter-col {
		display: grid;
		gap: 0.25em;
		background-color: var(--accent-l1);
	}
	.chapter {
		margin: 0em 0.5em;
	}
	div.content {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		display: grid;
		margin: 1em;
		gap: 1em;
	}
</style>
