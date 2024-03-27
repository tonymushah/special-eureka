<script lang="ts">
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { LayoutData } from "./$types";
	import { derived } from "svelte/store";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import { open } from "@tauri-apps/api/shell";
	type TopMangaStatisticsStoreData = TopMangaStatistics & {
		threadUrl?: string;
	};
	export let data: LayoutData;
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
	$: layoutData = data.layoutData!;
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
		if ($stats) {
			open($stats?.threadUrl);
		}
	}}
/>

<slot />
