<script lang="ts">
	import ChapterFeedElement1 from "@mangadex/componnents/chapter/feed/element1/ChapterFeedElement1WithReadableCover.svelte";
	import { CoverImageQuality, type RecentlyAddedHomeQuery } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { getContextClient } from "@urql/svelte";
	const client = getContextClient();
	export let chapters: RecentlyAddedHomeQuery;
	$: data = chapters.home.recentlyUploaded.data.map((c) => ({
		mangaId: c.relationships.manga.id,
		chapterId: c.id,
		download_state: ChapterDownloadState.NotDownloaded,
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
		mangaTitle: c.relationships.manga.attributes.title["en"] ?? "",
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
	}));
	$: halfwayThrough = Math.floor(data.length / 2);

	$: data1 = data.slice(0, halfwayThrough);
	$: data2 = data.slice(halfwayThrough, data.length);
</script>

<div class="content">
	<div class="chapter-col data1">
		{#each data1 as { chapterId, mangaId, coverImage, upload_date, lang, uploader, groups, mangaTitle, chapterTitle, coverImageAlt } (chapterId)}
			<div class="chapter">
				<ChapterFeedElement1
					{mangaId}
					{chapterId}
					download_state={ChapterDownloadState.NotDownloaded}
					{coverImage}
					{upload_date}
					{lang}
					{uploader}
					{groups}
					{mangaTitle}
					{coverImageAlt}
					{chapterTitle}
				/>
			</div>
		{/each}
	</div>
	<div class="chapter-col data2">
		{#each data2 as { chapterId, mangaId, coverImage, upload_date, lang, uploader, groups, mangaTitle, chapterTitle, coverImageAlt } (chapterId)}
			<div class="chapter">
				<ChapterFeedElement1
					{mangaId}
					{chapterId}
					download_state={ChapterDownloadState.NotDownloaded}
					{coverImage}
					{upload_date}
					{lang}
					{uploader}
					{groups}
					{mangaTitle}
					{coverImageAlt}
					{chapterTitle}
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
