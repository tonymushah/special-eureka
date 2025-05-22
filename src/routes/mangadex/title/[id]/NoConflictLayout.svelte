<script lang="ts">
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import { initChapterStoreContext } from "@mangadex/componnents/manga/page/chapters/aggreate/utils/chapterStores";
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import { initCoverImageStoreContext } from "@mangadex/componnents/manga/page/covers/utils/coverImageStoreContext";
	import MangaNavBar from "@mangadex/componnents/manga/page/MangaNavBar.svelte";
	import { initRelatedTitlesStoreContext } from "@mangadex/componnents/manga/page/related/utils/relatedTitleStore";
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import { addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { MangaDownload, MangaDownloadState } from "@mangadex/download/manga";
	import manga_following_status, {
		get_manga_following_status,
		set_manga_following_status
	} from "@mangadex/stores/manga/manga_following_status";
	import manga_reading_status, {
		get_manga_reading_status,
		set_manga_reading_status
	} from "@mangadex/stores/manga/manga_reading_status";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import { type Snippet } from "svelte";
	import { derived as der, writable } from "svelte/store";
	import { v4 } from "uuid";
	import type { LayoutData } from "./$types";
	import { setTitleLayoutData } from "./layout.context";
	import { goto } from "$app/navigation";
	import manga_rating, {
		get_manga_rating,
		set_manga_rating
	} from "@mangadex/stores/manga/manga_rating";
	import { debounce } from "lodash";
	import type { ReadingStatusEventDetail } from "@mangadex/componnents/manga/page/top-info/buttons/readingStatus";

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
	const isFollowing = manga_following_status(data.layoutData.id);
	$effect(() =>
		mangaDownload.state().subscribe((s) => {
			_state.set(s);
		})
	);
	function refetchReadingFollowingStatus() {
		Promise.all([
			get_manga_following_status(data.layoutData.id),
			get_manga_reading_status(data.layoutData.id),
			get_manga_rating(data.layoutData.id)
		]).catch(console.error);
	}
	function onSetReadingStatusError(e: unknown) {
		const title = "Error on updating the reading or follow status";
		if (e instanceof Error) {
			addToast({
				data: {
					title,
					description: e.message,
					variant: "danger"
				}
			});
		} else if (typeof e == "string") {
			addToast({
				data: {
					title,
					description: e,
					variant: "danger"
				}
			});
		} else {
			addToast({
				data: {
					title,
					variant: "danger"
				}
			});
		}
	}
	function onSetRatingError(e: unknown) {
		const title = "Error on updating your manga rating";
		if (e instanceof Error) {
			addToast({
				data: {
					title,
					description: e.message,
					variant: "danger"
				}
			});
		} else if (typeof e == "string") {
			addToast({
				data: {
					title,
					description: e,
					variant: "danger"
				}
			});
		} else {
			addToast({
				data: {
					title,
					variant: "danger"
				}
			});
		}
	}
	let disableAddToLibrary = $state(false);
	const onreadingStatus = debounce((e: ReadingStatusEventDetail) => {
		if (!disableAddToLibrary) {
			disableAddToLibrary = true;
			Promise.all([
				set_manga_reading_status(layoutData.id, e.readingStatus ?? null),
				set_manga_following_status(layoutData.id, e.isFollowing)
			])
				.then(() => {
					addToast({
						data: {
							title: "Manga reading and follow status sucessufully updated",
							variant: "green"
						}
					});
				})
				.catch((e) => {
					onSetReadingStatusError(e);
				})
				.finally(() => {
					e.closeDialog?.();
					disableAddToLibrary = false;
				});
		}
	});
	let disableRating = $state(false);
	const onrating = debounce((e: number | null) => {
		if (!disableRating) {
			disableRating = true;
			set_manga_rating(data.layoutData.id, e)
				.then(() => {
					addToast({
						data: {
							title: "Manga rating updated sucessully",
							variant: "green"
						}
					});
				})
				.catch((e) => {
					onSetRatingError(e);
				})
				.finally(() => {
					disableRating = false;
				});
		}
	});
</script>

<svelte:window onfocus={refetchReadingFollowingStatus} />

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
	{isFollowing}
	{onreadingStatus}
	ontag={({ id }) => {
		goto(
			route("/mangadex/tag/[id]", {
				id
			})
		);
	}}
	{disableAddToLibrary}
	rating={der(manga_rating(data.layoutData.id), (d) => d ?? undefined)}
	{onrating}
	{disableRating}
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
