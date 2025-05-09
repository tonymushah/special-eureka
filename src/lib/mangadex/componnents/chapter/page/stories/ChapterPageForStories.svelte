<script lang="ts">
	import { Direction, ImageFit, ReadingMode } from "@mangadex/gql/graphql";
	import { writable } from "svelte/store";
	import ChapterPage from "../ChapterPage.svelte";
	import { initCurrentChapterData, type CurrentChapterData } from "../contexts/currentChapter";
	import { initCurrentChapterReadingMode } from "../contexts/currentChapterReadingMode";
	import { initChapterCurrentPageContext } from "../contexts/currentPage";
	import { initCurrentChapterImageFit } from "../contexts/imageFit";
	import { initChapterImageContext } from "../contexts/images";
	import { initIsDrawerFixedWritable } from "../contexts/isDrawerFixed";
	import { initIsDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import { initCurrentChapterDirection } from "../contexts/readingDirection";
	import { initRelatedChapters, type RelatedChapters } from "../contexts/relatedChapters";
	import initDoublePageContexts from "../readinMode/doublePage/utils/contexts";
	import { initLongStripImagesWidthContext } from "../readinMode/longStrip/utils/context/longstrip_images_width";

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
		chapter = $bindable(),
		images = $bindable(),
		currentPage = $bindable(0),
		readingMode = $bindable(ReadingMode.SinglePage),
		isFixed = $bindable(false),
		isMenuOpen = $bindable(false),
		longStripImageWidth = $bindable(0),
		relatedChapters = $bindable([]),
		direction = $bindable(Direction.Ltr),
		imageFit = $bindable(ImageFit.Default)
	}: Props = $props();

	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	$effect(() => {
		imageFitStore.set(imageFit);
	});
	const lsImgWidth = initLongStripImagesWidthContext(writable(longStripImageWidth));
	$effect(() => {
		lsImgWidth.set(longStripImageWidth);
	});
	const is = initChapterImageContext(images);
	$effect(() => {
		is.set(images);
	});
	const current = initChapterCurrentPageContext(writable(currentPage));
	$effect(() => {
		current.set(currentPage);
	});
	const fixed = initIsDrawerFixedWritable(writable(isFixed));
	$effect(() => {
		fixed.set(isFixed);
	});
	const opened = initIsDrawerOpenWritable(writable(isMenuOpen));
	$effect(() => {
		opened.set(isMenuOpen);
	});
	const c = writable(chapter);
	initCurrentChapterData(c);
	$effect(() => {
		c.set(chapter);
	});
	const mode = initCurrentChapterReadingMode(writable(readingMode));
	$effect(() => {
		mode.set(readingMode);
	});
	const related = initRelatedChapters(writable(relatedChapters));
	$effect(() => {
		related.set(relatedChapters);
	});
	const pageDirection = initCurrentChapterDirection(writable(direction));
	$effect(() => {
		pageDirection.set(direction);
	});
	initDoublePageContexts();
</script>

<main>
	<ChapterPage />
</main>

<style lang="scss">
	main {
		height: 100vh;
	}
</style>
