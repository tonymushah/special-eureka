<!-- @migration-task Error while migrating Svelte code: can't migrate `$: layoutData = data.layoutData!;` to `$derived` because there's a variable named derived.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts" context="module">
	const contextKey = "title-layout-data";
	export function getTitleLayoutData(): LayoutData {
		return getContext(contextKey);
	}
	function setTitleLayoutData(data: LayoutData) {
		setContext(contextKey, data);
	}
</script>

<script lang="ts">
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { LayoutData } from "./$types";
	import { derived } from "svelte/store";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import { open } from "@tauri-apps/api/shell";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import MangaNavBar from "@mangadex/componnents/manga/page/MangaNavBar.svelte";
	import { getContext, setContext } from "svelte";
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import { page } from "$app/stores";
	import { route } from "$lib/ROUTES";
	import { v4 } from "uuid";
	import { initChapterStoreContext } from "@mangadex/componnents/manga/page/chapters/aggreate/utils/chapterStores";
	import { initCoverImageStoreContext } from "@mangadex/componnents/manga/page/covers/utils/coverImageStoreContext";
	import { initRelatedTitlesStoreContext } from "@mangadex/componnents/manga/page/related/utils/relatedTitleStore";
	type TopMangaStatisticsStoreData = TopMangaStatistics & {
		threadUrl?: string;
	};
	export let data: LayoutData;
	$: setTitleLayoutData(data);
	const statsStore = data.statsQueryStore!;
	const stats = derived(statsStore, ($stats) => {
		const _data = $stats.data?.statistics.manga.get;
		if (_data) {
			return {
				average: _data.rating.bayesian ?? 0,
				inner: {
					1: _data.rating.distrubution.r1,
					2: _data.rating.distrubution.r2,
					3: _data.rating.distrubution.r3,
					4: _data.rating.distrubution.r4,
					5: _data.rating.distrubution.r5,
					6: _data.rating.distrubution.r6,
					7: _data.rating.distrubution.r7,
					8: _data.rating.distrubution.r8,
					9: _data.rating.distrubution.r9,
					10: _data.rating.distrubution.r10
				},
				follows: _data.followCount,
				comments: _data.comments?.repliesCount,
				threadUrl: _data.comments?.threadUrl
			} satisfies TopMangaStatisticsStoreData;
		}
	});
	const isOnInfoPage = derived(
		page,
		($page) =>
			$page.url.pathname ==
			route("/mangadex/list/[id]", {
				id: data.layoutData?.id ?? v4()
			})
	);
	initChapterStoreContext();
	initCoverImageStoreContext();
	initRelatedTitlesStoreContext();
	$: layoutData = data.layoutData!;
	$: description = layoutData.description;
	$: hasRelation = data.queryResult!.relationships.manga.length > 0;
</script>

<MangaPageTopInfo
	bind:id={layoutData.id}
	title={layoutData.title ?? ""}
	altTitle={layoutData.altTitle}
	coverImage={layoutData.coverImage}
	coverImageAlt={layoutData.coverImageAlt}
	authors={layoutData.authors}
	tags={layoutData.tags}
	status={layoutData.status}
	year={layoutData.year ?? undefined}
	stats={$stats}
	on:comments={() => {
		if ($stats != undefined) {
			open($stats?.threadUrl);
		}
	}}
/>

<div class="out-top">
	<div class="top">
		{#if description}
			<div class="description">
				<Markdown bind:source={description} />
			</div>
		{/if}
		{#if $isOnInfoPage}
			<div class="info">
				<MangaPageInfo />
			</div>
		{/if}
	</div>

	<MangaNavBar
		bind:id={layoutData.id}
		bind:hasRelation
		comments={$stats?.comments}
		on:comment={() => {
			if ($stats != undefined) {
				open($stats?.threadUrl);
			}
		}}
	/>
	<slot />
</div>

<style lang="scss">
	div.out-top {
		margin: 0em 1em;
	}
	.top {
		display: none;
	}
	@media screen and (max-width: 1200px) {
		.top {
			display: block;
		}
	}
</style>
