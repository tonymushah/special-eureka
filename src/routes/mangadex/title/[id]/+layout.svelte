<script lang="ts">
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { LayoutData } from "./$types";
	import { derived as der, writable } from "svelte/store";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import MangaNavBar from "@mangadex/componnents/manga/page/MangaNavBar.svelte";
	import { type Snippet } from "svelte";
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import { v4 } from "uuid";
	import { initChapterStoreContext } from "@mangadex/componnents/manga/page/chapters/aggreate/utils/chapterStores";
	import { initCoverImageStoreContext } from "@mangadex/componnents/manga/page/covers/utils/coverImageStoreContext";
	import { initRelatedTitlesStoreContext } from "@mangadex/componnents/manga/page/related/utils/relatedTitleStore";
	import { setTitleLayoutData } from "./layout.context";
	import ConflictLayout from "./ConflictLayout.svelte";
	import { MangaDownload, MangaDownloadState } from "@mangadex/download/manga";
	import manga_reading_status, {
		get_manga_reading_status,
		set_manga_reading_status
	} from "@mangadex/stores/manga_reading_status";
	import { addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	type TopMangaStatisticsStoreData = TopMangaStatistics & {
		threadUrl?: string;
	};
	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	$effect.pre(() => {
		setTitleLayoutData(data);
	});
	let hasConflict = $derived.by(() => {
		const conflicts = data.conflicts;
		if (
			conflicts.contentRating != undefined ||
			conflicts.originalLanguage != undefined ||
			conflicts.publicationDemographic != undefined ||
			conflicts.status != undefined ||
			conflicts.tags.length != 0
		) {
			return true;
		} else {
			return false;
		}
	});
	let ingnoreConflict = $state(false);
	const statsStore = data.statsQueryStore!;
	const stats = der(statsStore, ($stats) => {
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
	let isOnInfoPage = $derived.by(
		() =>
			page.url.pathname ==
			route("/mangadex/title/[id]", {
				id: data.layoutData?.id ?? v4()
			})
	);
	initChapterStoreContext();
	initCoverImageStoreContext();
	initRelatedTitlesStoreContext();
	let layoutData = $derived(data.layoutData!);
	let description = $derived(layoutData.description);
	let hasRelation = $derived(data.queryResult!.relationships.manga.length > 0);

	let mangaDownload = $derived(new MangaDownload(data.layoutData.id));

	const _state = writable(MangaDownloadState.Pending);
	const reading_status = der(
		manga_reading_status(data.layoutData.id),
		(status) => status ?? undefined
	);
	$effect(() =>
		mangaDownload.state().subscribe((s) => {
			_state.set(s);
		})
	);
</script>

<svelte:window
	onfocus={() => {
		get_manga_reading_status(data.layoutData.id);
	}}
/>

{#if hasConflict && !ingnoreConflict}
	<ConflictLayout conflicts={data.conflicts} bind:ingnoreConflict />
{:else}
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
		oncomments={() => {
			if ($stats != undefined) {
				open($stats?.threadUrl);
			}
		}}
		contentRating={layoutData.contentRating ?? undefined}
		downloadState={_state}
		ondownload={async () => {
			await mangaDownload.download();
		}}
		ondelete={async () => {
			await mangaDownload.remove();
		}}
		ondownloading={async () => {
			await mangaDownload.cancel();
		}}
		{reading_status}
		onreadingStatus={(e) => {
			Promise.all([set_manga_reading_status(layoutData.id, e.readingStatus ?? null)])
				.then(() => {
					addToast({
						data: {
							title: "Manga reading and follow status sucessufully updated",
							variant: "green"
						}
					});
				})
				.catch((e) => {
					if (e instanceof Error) {
						addToast({
							data: {
								title: "Error on updating reading or follow status",
								description: e.message,
								variant: "danger"
							}
						});
					} else if (typeof e == "string") {
						addToast({
							data: {
								title: "Error on updating reading or follow status",
								description: e,
								variant: "danger"
							}
						});
					} else {
						addToast({
							data: {
								title: "Error on updating reading or follow status",
								variant: "danger"
							}
						});
					}
				})
				.finally(() => e.closeDialog?.());
		}}
	/>

	<div class="out-top">
		{#if description != undefined && isOnInfoPage}
			<div class="description">
				<Markdown source={description} />
			</div>
		{/if}
		<div class="top">
			{#if isOnInfoPage}
				<div class="info">
					<MangaPageInfo />
				</div>
			{/if}
		</div>

		<MangaNavBar
			id={layoutData.id}
			{hasRelation}
			comments={$stats?.comments}
			oncomment={() => {
				if ($stats != undefined) {
					open($stats?.threadUrl);
				}
			}}
		/>
		{@render children?.()}
	</div>
{/if}

<style lang="scss">
	div.out-top {
		margin: 0em 1em;
	}
	.top {
		display: none;
	}
	.info {
		display: none;
	}
	@media screen and (max-width: 1200px) {
		.top {
			display: block;
		}
		.info {
			display: block;
		}
	}
</style>
