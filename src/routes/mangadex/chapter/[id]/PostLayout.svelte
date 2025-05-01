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
	import type { LayoutData } from "./$types";
	import { writable } from "svelte/store";
	import {
		CurrentChapterData,
		CurrentChapterGroup,
		CurrentChapterThread,
		CurrentChapterTitle,
		CurrentChapterUploader,
		initCurrentChapterData
	} from "@mangadex/componnents/chapter/page/contexts/currentChapter";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";
	import { initChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import {
		initRelatedChapters,
		type RelatedChapter
	} from "@mangadex/componnents/chapter/page/contexts/relatedChapters";
	import { onMount } from "svelte";
	import relatedChaptersQuery from "./layout-query/related";
	import chapterPageThread from "./layout-query/thread";
	import { initLongStripImagesWidthContext } from "@mangadex/componnents/chapter/page/readinMode/longStrip/utils/context/longstrip_images_width";
	import { initChapterImageContext } from "@mangadex/componnents/chapter/page/contexts/images";
	import { initIsDrawerOpenWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerOpen";
	import { initIsDrawerFixedWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerFixed";
	import { initCurrentChapterReadingMode } from "@mangadex/componnents/chapter/page/contexts/currentChapterReadingMode";
	import readingModeWritable from "./layout-query/readingMode";
	import { initCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import readingDirectionWritable from "./layout-query/pageDirection";
	import { initCurrentChapterImageFit } from "@mangadex/componnents/chapter/page/contexts/imageFit";
	import imageFitWritable from "./layout-query/imageFit";
	import longstripImageWidthWritable from "./layout-query/longstripImageWidth";
	import { initChapterImagesRatioContext } from "@mangadex/componnents/chapter/page/contexts/images-double-ratio";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data = $bindable(), children }: Props = $props();

	const client = getContextClient();

	const related = initRelatedChapters(writable([]));
	const lsImgWidth = initLongStripImagesWidthContext(longstripImageWidthWritable);
	const fixed = initIsDrawerFixedWritable(writable(false));
	const opened = initIsDrawerOpenWritable(writable(false));
	const images = initChapterImageContext();
	initChapterImagesRatioContext();

	$effect(() => {
		images.set(data.pages.data);
	});
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
			.catch(console.error);
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
			.catch(console.error);
	});
</script>

{@render children?.()}
