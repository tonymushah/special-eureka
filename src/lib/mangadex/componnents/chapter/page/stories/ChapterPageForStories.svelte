<script lang="ts">
	import { writable } from "svelte/store";
	import { initCurrentChapterData, type CurrentChapterData } from "../contexts/currentChapter";
	import { initChapterCurrentPageContext } from "../contexts/currentPage";
	import { initChapterImageContext } from "../contexts/images";
	import { Direction, ImageFit, ReadingMode } from "@mangadex/gql/graphql";
	import { initIsDrawerFixedWritable } from "../contexts/isDrawerFixed";
	import { initCurrentChapterReadingMode } from "../contexts/currentChapterReadingMode";
	import ChapterPage from "../ChapterPage.svelte";
	import { initIsDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import { initLongStripImagesWidthContext } from "../readinMode/longStrip/utils/context/longstrip_images_width";
	import { initRelatedChapters, type RelatedChapters } from "../contexts/relatedChapters";
	import { initCurrentChapterDirection } from "../contexts/readingDirection";
	import { initCurrentChapterImageFit } from "../contexts/imageFit";

	export let chapter: CurrentChapterData;
	export let images: string[];
	export let currentPage: number = 0;
	export let readingMode: ReadingMode = ReadingMode.SinglePage;
	export let isFixed = false;
	export let isMenuOpen = false;
	export let longStripImageWidth = 0;
	export let relatedChapters: RelatedChapters = [];
	export let direction = Direction.Ltr;
	export let imageFit = ImageFit.Default;

	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	$: imageFitStore.set(imageFit);
	const lsImgWidth = initLongStripImagesWidthContext(writable(longStripImageWidth));
	$: lsImgWidth.set(longStripImageWidth);
	const is = initChapterImageContext(images);
	$: {
		is.set(images);
	}
	const current = initChapterCurrentPageContext(writable(currentPage));
	$: {
		current.set(currentPage);
	}
	const fixed = initIsDrawerFixedWritable(writable(isFixed));
	$: {
		fixed.set(isFixed);
	}
	const opened = initIsDrawerOpenWritable(writable(isMenuOpen));
	$: {
		opened.set(isMenuOpen);
	}
	const c = writable(chapter);
	initCurrentChapterData(c);
	$: c.set(chapter);
	const mode = initCurrentChapterReadingMode(writable(readingMode));
	$: mode.set(readingMode);
	const related = initRelatedChapters(writable(relatedChapters));
	$: related.set(relatedChapters);
	const pageDirection = initCurrentChapterDirection(writable(direction));
	$: pageDirection.set(direction);
</script>

<main>
	<ChapterPage />
</main>

<style lang="scss">
	main {
		height: 100vh;
	}
</style>
