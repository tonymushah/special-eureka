<script lang="ts">
	import { CoverImageQuality, type RecentlyAddedHomeQuery } from "@mangadex/gql/graphql";
	import type { ResMapInnerInner } from ".";
	import ChapterFeedElement1 from "@mangadex/componnents/chapter/feed/element1/ChapterFeedElement1WithReadableCover.svelte";
	import { writable, type Readable } from "svelte/store";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { getContextClient } from "@urql/svelte";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	let covers_stores = new Map<string, Readable<string | undefined>>();
	const client = getContextClient();
	export let chapters: RecentlyAddedHomeQuery;
	export let covers: Map<string, ResMapInnerInner> | undefined = undefined;
	$: data = chapters.home.recentlyUploaded.data;
	$: covers?.forEach((v, k) => {
		covers_stores.set(
			k,
			get_cover_art({
				client,
				manga_id: k,
				mode: CoverImageQuality.V256,
				cover_id: v.id,
				filename: v.filename
			})
		);
		covers_stores = covers_stores;
	});
	function defC() {
		return writable("");
	}
</script>

<div class="content">
	{#each data as c}
		<div class="chapter">
			{#if covers_stores.get(c.relationships.manga.id)}
				<ChapterFeedElement1
					mangaId={c.relationships.manga.id}
					chapterId={c.id}
					download_state={ChapterDownloadState.NotDownloaded}
					coverImage={covers_stores.get(c.relationships.manga.id) ?? defC()}
					upload_date={c.attributes.readableAt}
					lang={c.attributes.translatedLanguage}
					uploader={{
						id: c.relationships.user.id,
						name: c.relationships.user.attributes.username,
						roles: c.relationships.user.attributes.roles
					}}
					groups={c.relationships.scanlationGroups.map((v) => ({
						id: v.id,
						name: v.attributes.name
					}))}
					mangaTitle={c.relationships.manga.attributes.title["en"] ?? ""}
					coverImageAlt={`${c.id}/${c.attributes.volume}`}
					chapterTitle={`${
						c.attributes.volume != null && c.attributes.volume != undefined
							? `Vol. ${c.attributes.volume}`
							: ""
					}${
						c.attributes.chapter != null && c.attributes.chapter != undefined
							? `Ch. ${c.attributes.chapter}`
							: ""
					}${
						c.attributes.title != null && c.attributes.title != undefined
							? `${c.attributes.title}`
							: ""
					}`}
				/>
			{/if}
		</div>
	{/each}
</div>
