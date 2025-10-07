<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import {
		addMangaToAList,
		isMutating as isAddingToList
	} from "@mangadex/componnents/manga/add-to-list/AddToList.svelte";
	import { initChapterStoreContext } from "@mangadex/componnents/manga/page/chapters/aggreate/utils/chapterStores";
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import { initCoverImageStoreContext } from "@mangadex/componnents/manga/page/covers/utils/coverImageStoreContext";
	import MangaNavBar from "@mangadex/componnents/manga/page/MangaNavBar.svelte";
	import { initRelatedTitlesStoreContext } from "@mangadex/componnents/manga/page/related/utils/relatedTitleStore";
	import type { ReadingStatusEventDetail } from "@mangadex/componnents/manga/page/top-info/buttons/readingStatus";
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import { hasChapterToRead } from "@mangadex/componnents/manga/read/getMangaToReadChapter";
	import { readManga } from "@mangadex/componnents/manga/read/ReadDialog.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import mangaDownloadState, {
		cancelMutation as cancelMutationLoader,
		downloadMutationQuery as downloadMutationQueryLoader,
		removeMutation as removeMutationLoader
	} from "@mangadex/download/manga";
	import { mangaReadMarkers } from "@mangadex/gql-docs/read-markers/chapters";
	import { client } from "@mangadex/gql/urql";
	import manga_following_status, {
		get_manga_following_status,
		set_manga_following_status
	} from "@mangadex/stores/manga/manga_following_status";
	import manga_rating, {
		get_manga_rating,
		set_manga_rating
	} from "@mangadex/stores/manga/manga_rating";
	import manga_reading_status, {
		get_manga_reading_status,
		set_manga_reading_status
	} from "@mangadex/stores/manga/manga_reading_status";
	import { listenToAnyChapterReadMarkers } from "@mangadex/stores/read-markers";
	import { initContextReadChapterMarkers } from "@mangadex/stores/read-markers/context";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import manga_title_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-title-to-lang-map";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import { debounce } from "lodash";
	import { type Snippet } from "svelte";
	import { derived as der, derived, toStore } from "svelte/store";
	import { v4 } from "uuid";
	import type { LayoutData } from "./layout.context";
	import { setTitleLayoutData } from "./layout.context";
	import { isLogged } from "@mangadex/utils/auth";

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

	const _state = mangaDownloadState({ id: data.layoutData.id, deferred: true });
	const reading_status = der(
		manga_reading_status(data.layoutData.id),
		(status) => status ?? undefined
	);
	const isFollowing = manga_following_status(data.layoutData.id);

	function refetchReadingFollowingStatus() {
		Promise.all([
			get_manga_following_status(data.layoutData.id),
			get_manga_reading_status(data.layoutData.id),
			get_manga_rating(data.layoutData.id)
		]).catch(console.error);
	}
	function onSetReadingStatusError(e: unknown) {
		const title = "Error on updating the reading or follow status";
		addErrorToast(title, e);
	}
	function onSetRatingError(e: unknown) {
		const title = "Error on updating your manga rating";
		addErrorToast(title, e);
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
	const hasChaptToRead = hasChapterToRead(data.layoutData.id);
	setContextMenuContext(() =>
		mangaElementContextMenu({
			id: data.layoutData.id,
			coverArtId: data.queryResult.relationships.coverArt.id,
			tags: data.queryResult.attributes.tags.map((tag) => ({
				id: tag.id,
				name: manga_title_to_lang_map(tag.attributes.name)
			})),
			artists: data.queryResult.relationships.artists.map((a) => ({
				id: a.id,
				name: a.attributes.name
			})),
			authors: data.queryResult.relationships.authors.map((a) => ({
				id: a.id,
				name: a.attributes.name
			}))
		})
	);
	const chapterReadMarkers = createQuery(() => {
		const id = data.layoutData.id;
		return {
			queryKey: ["title", id, "read-markers", "page"],
			async queryFn() {
				const res = await client
					.query(mangaReadMarkers, {
						id
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				} else {
					return res.data?.readMarker.mangaReadMarkersByMangaId.map(String) ?? [];
				}
			}
		} satisfies CreateQueryOptions;
	});
	initContextReadChapterMarkers(
		derived(
			[toStore(() => chapterReadMarkers)],
			([$query], set, update) => {
				set(new Map($query.data?.map((d) => [d, true]) ?? []) as Map<string, boolean>);
				return listenToAnyChapterReadMarkers.subscribe((a) => {
					if (a != undefined) {
						update((markers: Map<string, boolean>) => {
							const state = markers.get(a.chapter);
							if (state != undefined) {
								markers.set(a.chapter, a.read);
							}
							return markers;
						});
					}
				});
			},
			new Map()
		)
	);
	let removeMutation = removeMutationLoader();
	let downloadMutationQuery = downloadMutationQueryLoader();
	let cancelMutation = cancelMutationLoader();
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
		await downloadMutationQuery.mutateAsync(data.layoutData.id);
	}}
	ondelete={async () => {
		await removeMutation.mutateAsync(data.layoutData.id);
	}}
	ondownloading={async () => {
		await cancelMutation.mutateAsync(data.layoutData.id);
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
	disableAddToLibrary={disableAddToLibrary && !$isLogged}
	rating={der(manga_rating(data.layoutData.id), (d) => d ?? undefined)}
	{onrating}
	disableRating={disableRating && !$isLogged}
	disableRead={!$hasChaptToRead}
	onread={() => {
		readManga(data.layoutData.id);
	}}
	disableAddToList={$isAddingToList}
	onaddToList={() => {
		addMangaToAList(data.layoutData.id);
	}}
	disableReport
	disableUpload
/>

<div class="out-top">
	{#if description != undefined && isOnInfoPage}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="description"
			oncontextmenu={registerContextMenuEvent({
				preventDefault: true,
				additionalMenus: [
					ContextMenuItemProvider.menuItem({
						text: "Copy Descrription",
						action() {
							writeText(description);
						}
					})
				]
			})}
		>
			<Markdown source={description} />
		</div>
	{/if}
	<div class="top">
		{#if isOnInfoPage}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="info"
				oncontextmenu={registerContextMenuEvent({
					preventDefault: true
				})}
			>
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
