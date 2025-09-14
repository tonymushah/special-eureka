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
		return new CurrentChapterData({
			id,
			uploader,
			title,
			chapterNumber,
			series,
			translatedLanguage: data.attributes.translatedLanguage,
			groups: scans_groups,
			volume
		});
	}
</script>

<script lang="ts">
	/// TODO add fixed mangareading style
	/// TODO Add cached chapter double page context data
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
	import { initCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import {
		initRelatedChapters,
		type RelatedChapter
	} from "@mangadex/componnents/chapter/page/contexts/relatedChapters";
	import { initLongStripImagesWidthContext } from "@mangadex/componnents/chapter/page/readinMode/longStrip/utils/context/longstrip_images_width";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import imageFitWritable from "@mangadex/gql-docs/chapter/layout-query/imageFit";
	import longstripImageWidthWritable from "@mangadex/gql-docs/chapter/layout-query/longstripImageWidth";
	import readingDirectionWritable from "@mangadex/gql-docs/chapter/layout-query/pageDirection";
	import readingModeWritable from "@mangadex/gql-docs/chapter/layout-query/readingMode";
	import relatedChaptersQuery from "@mangadex/gql-docs/chapter/layout-query/related";
	import chapterPageThread from "@mangadex/gql-docs/chapter/layout-query/thread";
	import { DrawerMode } from "@mangadex/gql/graphql";
	import { drawerModeStore } from "@mangadex/stores/chapterLayout";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";
	import { derived, writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data = $bindable(), children }: Props = $props();

	const client = getContextClient();

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
	initCurrentChapterReadingMode(readingModeWritable);
	initCurrentChapterDirection(readingDirectionWritable);
	initCurrentChapterImageFit(imageFitWritable);
	const currentPage = initChapterCurrentPageContext(writable(data.currentPage));
	$effect(() => {
		currentPage.set(data.currentPage);
	});
	$effect(() => {
		currentChapterData.set(layoutDataToCurrentChapterData(data));
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
	$effect(() => {
		client
			.query(chapterPageThread, {
				id: data.data.id
			})
			.toPromise()
			.then((res) => {
				const chapterStats = res.data?.statistics.chapter.get;
				if (chapterStats) {
					const commentsData = chapterStats.comments;
					if (commentsData) {
						currentChapterData.update((current) => {
							current.thread = new CurrentChapterThread({
								comments: commentsData.repliesCount,
								threadUrl: commentsData.threadUrl
							});
							return current;
						});
					}
				}
			})
			.catch((e) => {
				addErrorToast("Cannot fetch chapter comments data", e);
			});
	});
</script>

<AppTitle
	title={`${$currentPage + 1} | ${data.data.attributes.chapter ?? "Oneshot"} - ${get_value_from_title_and_random_if_undefined(data.data.relationships.manga.attributes.title, "en") ?? "none"} - MangaDex`}
/>

{@render children?.()}
