<script lang="ts">
	import { run } from 'svelte/legacy';

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

	interface Props {
		chapter: CurrentChapterData;
		images: string[];
		currentPage?: number;
		readingMode?: ReadingMode;
		isFixed?: boolean;
		isMenuOpen?: boolean;
		longStripImageWidth?: number;
		relatedChapters?: RelatedChapters;
		direction?: any;
		imageFit?: any;
	}

	let {
		chapter,
		images,
		currentPage = 0,
		readingMode = ReadingMode.SinglePage,
		isFixed = false,
		isMenuOpen = false,
		longStripImageWidth = 0,
		relatedChapters = [],
		direction = Direction.Ltr,
		imageFit = ImageFit.Default
	}: Props = $props();

	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	run(() => {
		imageFitStore.set(imageFit);
	});
	const lsImgWidth = initLongStripImagesWidthContext(writable(longStripImageWidth));
	run(() => {
		lsImgWidth.set(longStripImageWidth);
	});
	const is = initChapterImageContext(images);
	run(() => {
		is.set(images);
	});
	const current = initChapterCurrentPageContext(writable(currentPage));
	run(() => {
		current.set(currentPage);
	});
	const fixed = initIsDrawerFixedWritable(writable(isFixed));
	run(() => {
		fixed.set(isFixed);
	});
	const opened = initIsDrawerOpenWritable(writable(isMenuOpen));
	run(() => {
		opened.set(isMenuOpen);
	});
	const c = writable(chapter);
	initCurrentChapterData(c);
	run(() => {
		c.set(chapter);
	});
	const mode = initCurrentChapterReadingMode(writable(readingMode));
	run(() => {
		mode.set(readingMode);
	});
	const related = initRelatedChapters(writable(relatedChapters));
	run(() => {
		related.set(relatedChapters);
	});
	const pageDirection = initCurrentChapterDirection(writable(direction));
	run(() => {
		pageDirection.set(direction);
	});
</script>

<main>
	<ChapterPage />
</main>

<style lang="scss">
	main {
		height: 100vh;
	}
</style>
