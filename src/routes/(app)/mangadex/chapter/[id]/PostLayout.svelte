<script lang="ts" module>
	// TODO Add oneshot support
	function layoutDataToCurrentChapterData({ data }: LayoutData): CurrentChapterData {
		const id: string = data.id;
		const volume =
			data.attributes.volume == null || data.attributes.volume == undefined
				? undefined
				: data.attributes.volume;
		const title =
			data.attributes.title == null || data.attributes.title == undefined
				? undefined
				: data.attributes.title;
		const chapterNumber =
			data.attributes.chapter == null || data.attributes.chapter == undefined
				? undefined
				: data.attributes.chapter;
		const uploader = new CurrentChapterUploader({
			id: data.relationships.user.id,
			name: data.relationships.user.attributes.username,
			roles: data.relationships.user.attributes.roles
		});
		const scans_groups = data.relationships.scanlationGroups.map(
			(group) =>
				new CurrentChapterGroup({
					name: group.attributes.name,
					id: group.id
				})
		);
		const series = new CurrentChapterTitle({
			id: data.relationships.manga.id,
			title:
				get_value_from_title_and_random_if_undefined(
					data.relationships.manga.attributes.title,
					"en"
				) ?? ""
		});
		const cdata = new CurrentChapterData({
			id,
			uploader,
			title,
			chapterNumber,
			series,
			translatedLanguage: data.attributes.translatedLanguage,
			groups: scans_groups,
			volume
		});
		cdata.isOneshot = chapterNumber == undefined && volume == undefined;
		cdata.isLongstrip = data.relationships.manga.attributes.isLongstrip;
		return cdata;
	}
</script>

<script lang="ts">
	/// TODO add fixed mangareading style
	/// TODO Add cached chapter double page context data
	import { dev } from "$app/environment";
	import {
		CurrentChapterData,
		CurrentChapterGroup,
		CurrentChapterThread,
		CurrentChapterTitle,
		CurrentChapterUploader,
		initCurrentChapterData
	} from "@mangadex/componnents/chapter/page/contexts/currentChapter";
	import { initCurrentChapterReadingMode } from "@mangadex/componnents/chapter/page/contexts/currentChapterReadingMode";
	import { initChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import { initCurrentChapterImageFit } from "@mangadex/componnents/chapter/page/contexts/imageFit";
	import { initIsDrawerFixedWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerFixed";
	import { initIsDrawerOpenWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerOpen";
	import { addListenerToChapterThreadEventTarget } from "@mangadex/componnents/chapter/page/contexts/previousNextEventTarget";
	import { initCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import {
		initRelatedChapters,
		type RelatedChapter
	} from "@mangadex/componnents/chapter/page/contexts/relatedChapters";
	import { initLongStripImagesWidthContext } from "@mangadex/componnents/chapter/page/readinMode/longStrip/utils/context/longstrip_images_width";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import imageFitWritable from "@mangadex/gql-docs/chapter/layout-query/imageFit";
	import longstripImageWidthWritable from "@mangadex/gql-docs/chapter/layout-query/longstripImageWidth";
	import readingDirectionWritable from "@mangadex/gql-docs/chapter/layout-query/pageDirection";
	import readingModeWritable from "@mangadex/gql-docs/chapter/layout-query/readingMode";
	import relatedChaptersQuery from "@mangadex/gql-docs/chapter/layout-query/related";
	import chapterPageThread from "@mangadex/gql-docs/chapter/layout-query/thread";
	import { DrawerMode, ForumThreadType, ReadingMode } from "@mangadex/gql/graphql";
	import { getChapterPageSync } from "@mangadex/stores/chapter/page";
	import { allowSync } from "@mangadex/stores/chapter/page/allowSync.svelte";
	import { drawerModeStore } from "@mangadex/stores/chapterLayout";
	import { readMarkers as readMarkersLoader } from "@mangadex/stores/read-markers/mutations";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { getContextClient } from "@urql/svelte";
	import { derived, toStore, writable } from "svelte/store";
	import type { LayoutData } from "./layout.context";
	import { createQuery } from "@tanstack/svelte-query";
	import { createForumThread } from "@mangadex/stores/create-forum-thread";
	import { onMount, untrack } from "svelte";
	import { delay } from "lodash";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data = $bindable(), children }: Props = $props();

	const client = getContextClient();
	let readMarkers = readMarkersLoader();
	$effect(() => {
		const chapterId = data.data.id;
		if (typeof chapterId == "string") {
			const time = delay(() => {
				readMarkers.mutate(
					{
						reads: [chapterId],
						unreads: [],
						// NOTE history is currently disabled
						updateHistory: false
					},
					{
						onSuccess(data, variables, context) {
							if (dev) {
								addToast({
									data: {
										title: "Marked chapter as read"
									}
								});
							}
						},
						onError(error, variables, context) {
							addErrorToast("Cannot mark chapter as read", error);
						}
					}
				);
			}, 100);
			return () => {
				clearTimeout(time);
			};
		}
	});
	const related = initRelatedChapters(writable([]));
	const lsImgWidth = initLongStripImagesWidthContext(longstripImageWidthWritable);
	const pinnedDerived = derived(
		drawerModeStore,
		(drawerModeStore) => drawerModeStore == DrawerMode.Pinned
	);
	const fixed = initIsDrawerFixedWritable({
		subscribe(run, invalidate) {
			return pinnedDerived.subscribe(run, invalidate);
		},
		set(value) {
			drawerModeStore.set(value ? DrawerMode.Pinned : DrawerMode.Unpinned);
		},
		update(updater) {
			drawerModeStore.update((v) =>
				updater(v == DrawerMode.Pinned) ? DrawerMode.Pinned : DrawerMode.Pinned
			);
		}
	});
	const opened = initIsDrawerOpenWritable(writable(false));

	const currentChapterData = initCurrentChapterData(
		writable(layoutDataToCurrentChapterData(data))
	);

	const dataStore = toStore(() => data);
	const readingModeCur = derived([readingModeWritable, dataStore], ([inner, data]) => {
		if (data.data.relationships.manga.attributes.isLongstrip) {
			return ReadingMode.LongStrip;
		} else {
			return inner;
		}
	});
	initCurrentChapterReadingMode({
		subscribe: readingModeCur.subscribe,
		set(value) {
			if (!data.data.relationships.manga.attributes.isLongstrip) {
				readingModeWritable.set(value);
			}
		},
		update(updater) {
			if (!data.data.relationships.manga.attributes.isLongstrip) {
				readingModeWritable.update(updater);
			}
		}
	});

	initCurrentChapterDirection(readingDirectionWritable);
	initCurrentChapterImageFit(imageFitWritable);
	const chapterSync = getChapterPageSync(data.data.id);
	const currentPage = initChapterCurrentPageContext(
		writable(data.currentPage, (set) => {
			return chapterSync.subscribe((page) => {
				if (allowSync.allow && typeof page == "number") {
					set(page);
				}
			});
		})
	);
	$effect(() => {
		currentPage.set(data.currentPage);
	});
	$effect(() => {
		currentChapterData.set(layoutDataToCurrentChapterData(data));
	});
	$effect(() => {
		chapterSync.set($currentPage);
	});
	$effect(() => {
		client
			.query(relatedChaptersQuery, {
				groups: data.data.relationships.scanlationGroups.map((g) => g.id),
				mangaId: data.data.relationships.manga.id,
				langs: data.data.attributes.translatedLanguage
			})
			.toPromise()
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				const rel = res.data?.manga.aggregate.default.volumes.flatMap(
					({ volume, chapters }) =>
						chapters.map<RelatedChapter>(({ chapter, ids }) => ({
							volume,
							chapter,
							id: ids.includes(data.data.id) ? data.data.id : ids[0]
						}))
				);
				if (rel) {
					related.set(rel);
				}
			})
			.catch((e) => {
				addErrorToast("Cannot get related chapters", e);
			});
	});
	let chapterPageThreadQuery = createQuery(() => ({
		queryKey: ["chapter", data.data.id, "thread"],
		async queryFn() {
			const res = await client
				.query(chapterPageThread, {
					id: data.data.id
				})
				.toPromise();
			if (res.data) {
				return res.data.statistics.chapter.get.comments;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("No data??");
			}
		},
		networkMode: "online"
	}));
	$effect(() => {
		let commentsData = chapterPageThreadQuery.data;
		if (commentsData != undefined && commentsData != null)
			currentChapterData.update((current) => {
				current.thread = new CurrentChapterThread({
					comments: commentsData.repliesCount,
					threadUrl: commentsData.threadUrl
				});
				return current;
			});
	});
	let createForumThreadMutation = createForumThread();
	onMount(() =>
		addListenerToChapterThreadEventTarget(() => {
			const threadUrl = $currentChapterData.thread?.threadUrl;
			if (threadUrl) {
				openUrl(threadUrl).catch((e) => {
					addErrorToast("Error on opening url", e);
				});
			} else {
				if (!createForumThreadMutation.isPending) {
					untrack(() => createForumThreadMutation).mutate(
						{
							id: data.data.id,
							threadType: ForumThreadType.Chapter
						},
						{
							onError(error) {
								addErrorToast("Cannot create forum thread", error);
							},
							onSuccess(data) {
								openUrl(data.forumUrl);
								chapterPageThreadQuery.refetch();
							}
						}
					);
				}
			}
		})
	);
</script>

<AppTitle
	title={`${$currentPage + 1} | ${data.data.attributes.chapter ?? "Oneshot"} - ${get_value_from_title_and_random_if_undefined(data.data.relationships.manga.attributes.title, "en") ?? "none"} - MangaDex`}
/>

{@render children?.()}
