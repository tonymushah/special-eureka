<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import {
		addMangaToAList,
		isMutating as isAddingToList
	} from "@mangadex/componnents/manga/add-to-list/AddToList.svelte";
	import { initChapterStoreContext } from "@mangadex/componnents/manga/page/chapters/aggreate/utils/chapterStores.svelte";
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import MangaNavBar from "@mangadex/componnents/manga/page/MangaNavBar.svelte";
	import { initRelatedTitlesStoreContext } from "@mangadex/componnents/manga/page/related/utils/relatedTitleStore";
	import type { ReadingStatusEventDetail } from "@mangadex/componnents/manga/page/top-info/buttons/readingStatus";
	import MangaPageTopInfo from "@mangadex/componnents/manga/page/top-info/MangaPageTopInfo.svelte";
	import type { TopMangaStatistics } from "@mangadex/componnents/manga/page/top-info/stats";
	import { hasChapterToRead } from "@mangadex/componnents/manga/read/getMangaToReadChapter.svelte";
	import { readManga } from "@mangadex/componnents/manga/read/ReadDialog.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import MangaDownload, {
		cancelMutation as cancelMutationLoader,
		downloadMutationQuery as downloadMutationQueryLoader,
		removeMutation as removeMutationLoader
	} from "@mangadex/download/manga.svelte";
	import { mangaReadMarkers } from "@mangadex/gql-docs/read-markers/chapters";
	import { client } from "@mangadex/gql/urql";
	import {
		get_manga_following_status,
		set_manga_following_status
	} from "@mangadex/stores/manga/manga_following_status";
	import { get_manga_rating, set_manga_rating } from "@mangadex/stores/manga/manga_rating";
	import manga_rating from "@mangadex/stores/manga/manga_rating.svelte";
	import {
		get_manga_reading_status,
		set_manga_reading_status
	} from "@mangadex/stores/manga/manga_reading_status";
	import manga_reading_status from "@mangadex/stores/manga/manga_reading_status.svelte";
	import { listenToAnyChapterReadMarkers } from "@mangadex/stores/read-markers";
	import { initContextReadChapterMarkers } from "@mangadex/stores/read-markers/context.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import manga_title_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-title-to-lang-map";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { createMutation, createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import { debounce, delay, noop } from "lodash";
	import { untrack, type Snippet } from "svelte";
	import { v4 } from "uuid";
	import type { LayoutData } from "./layout.context";
	import { setTitleLayoutData } from "./layout.context";
	import { isLogged } from "@mangadex/utils/auth";
	import { createForumThread } from "@mangadex/stores/create-forum-thread";
	import { ForumThreadType, MangaInfosPositions, ReportCategory } from "@mangadex/gql/graphql";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { dev } from "$app/environment";
	import ReportDialog from "@mangadex/componnents/report/dialog/ReportDialog.svelte";
	import UploadDialog from "@mangadex/componnents/upload/UploadDialog.svelte";
	import { ArrowUpFromLine } from "@lucide/svelte";
	import { fade } from "svelte/transition";
	import { mangaInfoPosition } from "@mangadex/stores/manga-info-position";
	import statsGQLQuery from "./(layout)/statsQuery";
	import { getCurrentWebview } from "@tauri-apps/api/webview";
	import { waitAsync } from "$lib/utils";
	import { Debounced, IsInViewport } from "runed";
	import manga_following_status from "@mangadex/stores/manga/manga_following_status.svelte";

	type TopMangaStatisticsStoreData = TopMangaStatistics & {
		threadUrl?: string;
	};
	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	setTitleLayoutData(() => data);

	let isInViewPortTrigger = $state<HTMLElement | undefined>();
	let _isInViewport = new IsInViewport(() => isInViewPortTrigger);
	let isInViewport = new Debounced(() => _isInViewport.current, 500);
	// NOTE: this is completely intentional
	let statsQuery = createQuery(() => ({
		queryKey: ["title", data.layoutData.id, "stats"],
		async queryFn() {
			const res = await client
				.query(statsGQLQuery, {
					id: data.layoutData.id
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.statistics.manga.get;
			} else {
				throw new Error("no data");
			}
		},
		enabled: isInViewport.current,
		networkMode: "online"
	}));
	let stats: TopMangaStatisticsStoreData | undefined = $derived.by(() => {
		const _data = statsQuery.data;
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
			} as TopMangaStatisticsStoreData;
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
	initRelatedTitlesStoreContext();
	let layoutData = $derived(data.layoutData!);
	let description = $derived(layoutData.description);
	let hasRelation = $derived(data.queryResult!.relationships.manga.length > 0);

	let mangaDownload = new MangaDownload(
		() => data.layoutData.id,
		() => isInViewport.current
	);
	// TODO transform these into class based reactivit
	const reading_status = manga_reading_status(() => data.layoutData.id, {
		getOnMount: false
	});
	const isFollowing = manga_following_status(() => data.layoutData.id, {
		getOnMount: false
	});
	const ratingStore = manga_rating(() => data.layoutData.id);

	let followingStatusQuery = createQuery(() => ({
		queryKey: ["title", data.layoutData.id, "following", "status"],
		queryFn() {
			return get_manga_following_status(data.layoutData.id);
		},
		enabled: $isLogged && isInViewport.current
	}));
	let readingStatusQuery = createQuery(() => ({
		queryKey: ["title", data.layoutData.id, "reading", "status"],
		queryFn() {
			return get_manga_reading_status(data.layoutData.id);
		},
		enabled: $isLogged && isInViewport.current
	}));
	let title_rating = createQuery(() => ({
		queryKey: ["title", data.layoutData.id, "user-defined", "rating"],
		queryFn() {
			return get_manga_rating(data.layoutData.id);
		},
		enabled: $isLogged && isInViewport.current
	}));
	function refetchReadingFollowingStatus() {
		Promise.all([
			followingStatusQuery.refetch(),
			readingStatusQuery.refetch(),
			title_rating.refetch()
		]).catch((e) => {
			if (dev) console.error(e);
		});
	}
	function onSetReadingStatusError(e: unknown) {
		const title = "Error on updating the reading or follow status";
		addErrorToast(title, e);
	}
	function onSetRatingError(e: unknown) {
		const title = "Error on updating your manga rating";
		addErrorToast(title, e);
	}
	let readingStatusMutation = createMutation(() => ({
		mutationKey: ["title", layoutData.id as string, "setReadingStatus"],
		async mutationFn(e: ReadingStatusEventDetail) {
			const res = await Promise.all([
				set_manga_reading_status(layoutData.id, e.readingStatus ?? null),
				set_manga_following_status(layoutData.id, e.isFollowing)
			]);
			await waitAsync(1000);
			return res;
		},
		onSettled(data, error, variables) {
			variables.closeDialog?.();
		},
		onError(err) {
			onSetReadingStatusError(err);
		},
		onSuccess() {
			addToast({
				title: "Manga reading and follow status sucessufully updated",
				type: "success"
			});
		}
	}));
	let disableAddToLibrary = $derived(readingStatusMutation.isPending);
	const onreadingStatus = debounce((e: ReadingStatusEventDetail) => {
		readingStatusMutation.mutate(e);
	});
	let titleRatingMutation = createMutation(() => ({
		mutationKey: ["title", layoutData.id as string, "setTitleRating"],
		async mutationFn(e: number | null) {
			return await set_manga_rating(data.layoutData.id, e);
		},
		onError(e) {
			onSetRatingError(e);
		},
		onSuccess() {
			addToast({
				title: "Manga rating updated sucessully",
				type: "success"
			});
		}
	}));
	let disableRating = $derived(titleRatingMutation.isPending);
	const onrating = debounce((e: number | null) => {
		titleRatingMutation.mutate(e);
	});
	const hasChaptToRead = hasChapterToRead(() => data.layoutData.id);
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
	let chapterReadMarkers = createQuery(() => {
		let id = data.layoutData.id;
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
			},
			enabled: $isLogged
		} satisfies CreateQueryOptions;
	});

	const webview = getCurrentWebview();
	$effect(() => {
		const sub = webview.listen(`mangadex-title-read-markers-change-${data.layoutData.id}`, () => {
			chapterReadMarkers.refetch();
		});
		return () => {
			sub.then((v) => v());
		};
	});

	let readContextMarkers = initContextReadChapterMarkers();
	$effect(() => {
		const query = chapterReadMarkers;
		if (query.isSuccess) {
			readContextMarkers.clear();
			query.data.forEach((d) => readContextMarkers.set(d, true));
			const sub = listenToAnyChapterReadMarkers.subscribe((a) => {
				untrack(() => {
					if (a != undefined) {
						if (query.isSuccess) {
							if (readContextMarkers.size > 1) {
								const state = readContextMarkers.get(a.chapter);
								if (state != undefined) {
									readContextMarkers.set(a.chapter, a.read);
								}
							}
						}
					}
				});
			});
			return sub;
		}
	});
	let removeMutation = removeMutationLoader();
	let downloadMutationQuery = downloadMutationQueryLoader();
	let cancelMutation = cancelMutationLoader();
	let createForumThreadMutation = createForumThread();
	function createForumThreadAndOpen() {
		createForumThreadMutation.mutate(
			{
				id: layoutData.id,
				threadType: ForumThreadType.Manga
			},
			{
				onError(error) {
					addErrorToast("Cannot create forum thread", error);
				},
				onSuccess(data) {
					open(data.forumUrl);
				}
			}
		);
	}
	let openReportDialog = $state(false);
	let openUploadDialog = $state(false);
	// BUG: If you expand the collapsible and resize your window, the show more label will still be there.
	let collapsibleEl = $state<HTMLElement>();
	let canCollapse = $state(false);
	let collapsed = $state(false);
	let collapsibleHeight = $derived.by(() => {
		if (canCollapse) {
			if (collapsed) {
				return "80px";
			} else if (collapsibleEl) {
				return `${collapsibleEl.scrollHeight}px`;
			}
		}
	});
	let mangaInfoPos = $derived($mangaInfoPosition);
	$effect(() => {
		noop(collapsibleEl, mangaInfoPos, isOnInfoPage);
		const d = delay(() => shouldCollapseFn(), 2);
		return () => {
			clearTimeout(d);
		};
	});

	function shouldCollapseFn() {
		if (collapsibleEl) {
			if (collapsibleEl.scrollHeight > 80) {
				canCollapse = true;
				collapsed = true;
			} else {
				canCollapse = false;
				collapsed = false;
			}
		}
	}
	let shouldInfoBeneathDesc = $derived(mangaInfoPos == MangaInfosPositions.BeneathDescription);
</script>

<svelte:window
	onfocus={debounce(refetchReadingFollowingStatus, 4000)}
	onresize={debounce(() => {
		shouldCollapseFn();
	})}
/>

<AppTitle title={`${layoutData.title ?? ""} | MangaDex`} />

<div bind:this={isInViewPortTrigger}>
	<MangaPageTopInfo
		id={layoutData.id}
		title={layoutData.title ?? ""}
		altTitle={layoutData.altTitle}
		coverImageAlt={layoutData.coverImageAlt}
		authors={layoutData.authors}
		tags={layoutData.tags}
		status={layoutData.status}
		year={layoutData.year ?? undefined}
		{stats}
		oncomments={() => {
			if (stats != undefined) {
				const url = stats.threadUrl;
				if (url) {
					open(url);
				} else {
					createForumThreadAndOpen();
				}
			}
		}}
		contentRating={layoutData.contentRating ?? undefined}
		downloadState={mangaDownload.mangaDownloadState}
		ondownload={async () => {
			await downloadMutationQuery.mutateAsync(data.layoutData.id);
		}}
		ondelete={async () => {
			await removeMutation.mutateAsync(data.layoutData.id);
		}}
		ondownloading={async () => {
			await cancelMutation.mutateAsync(data.layoutData.id);
		}}
		reading_status={reading_status.value ?? undefined}
		isFollowing={isFollowing.value}
		{onreadingStatus}
		ontag={({ id }) => {
			goto(
				route("/mangadex/tag/[id]", {
					id
				})
			);
		}}
		disableAddToLibrary={disableAddToLibrary || !$isLogged}
		rating={ratingStore.value ?? undefined}
		{onrating}
		disableRating={disableRating || !$isLogged}
		disableRead={!hasChaptToRead.value}
		onread={() => {
			readManga(data.layoutData.id);
		}}
		disableAddToList={$isAddingToList}
		onaddToList={() => {
			addMangaToAList(data.layoutData.id);
		}}
		disableReport={!$isLogged && !dev}
		onreport={() => {
			openReportDialog = true;
		}}
		onupload={() => {
			openUploadDialog = true;
		}}
		originalLanguage={data.queryResult.attributes.originalLanguage}
	/>
</div>

<ReportDialog
	bind:open={openReportDialog}
	category={ReportCategory.Manga}
	objectId={data.layoutData.id}
/>

<UploadDialog
	bind:open={openUploadDialog}
	mangaId={data.layoutData.id}
	ondone={(sessionId) => {
		goto(
			route("/mangadex/upload/[id]", {
				id: sessionId
			})
		);
	}}
/>

<div class="out-top">
	<div
		class="collapsible"
		bind:this={collapsibleEl}
		class:collapsed
		style:height={collapsibleHeight}
	>
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
		<div class="top" class:shouldInfoBeneathDesc>
			{#if isOnInfoPage}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="info"
					class:shouldInfoBeneathDesc
					oncontextmenu={registerContextMenuEvent({
						preventDefault: true
					})}
				>
					<MangaPageInfo />
				</div>
			{/if}
		</div>
	</div>
	{#if canCollapse}
		<div
			class="collapse-trigger-layout"
			transition:fade={{
				duration: 100
			}}
			class:collapsed
		>
			<button
				onclick={() => {
					collapsed = !collapsed;
				}}
				class="to-collapse-button"
				class:collapsed
			>
				{#if collapsed}
					Show more
				{:else}
					<ArrowUpFromLine size="14" /> Show less <ArrowUpFromLine size="14" />
				{/if}
			</button>
		</div>
	{/if}
	<MangaNavBar
		id={layoutData.id}
		{hasRelation}
		comments={stats?.comments}
		oncomment={() => {
			if (stats != undefined) {
				const url = stats?.threadUrl;
				if (url) {
					open(url);
				} else {
					createForumThreadAndOpen();
				}
			}
		}}
		disableComments={createForumThreadMutation.isPending ||
			statsQuery.isLoading ||
			stats == undefined}
	/>
	{@render children?.()}
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";
	div.out-top {
		margin: 0em 1em;
	}
	.top {
		display: none;
	}
	.info {
		display: none;
	}
	.collapsible {
		overflow: hidden;
		transition: height 100ms ease-in-out;
	}
	/*
	// Disabled until a fix is found...
	.collapsible.collapsed {
		mask-image: linear-gradient(
			var(--main-background) 0%,
			var(--main-background) 60%,
			transparent 100%
		);
		}
	*/
	.collapse-trigger-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.collapse-trigger-layout.collapsed {
		border-top: 3px solid var(--mid-tone);
	}
	.to-collapse-button {
		background-color: var(--accent);
		color: var(--text-color);
		font-family: var(--fonts);
		border-radius: 6px;
		border: 3px solid var(--contrast-l1);
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
	}
	.to-collapse-button.collapsed {
		background-color: var(--primary-l2);
		border-color: var(--mid-tone);
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		border-top: none;
	}
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "xl")) {
		.top {
			display: block;
		}
		.info {
			display: block;
		}
	}
	.info.shouldInfoBeneathDesc {
		display: block;
	}
	.top.shouldInfoBeneathDesc {
		display: block;
	}
</style>
