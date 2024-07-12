<script lang="ts">
	import { writable } from "svelte/store";
	import { initCurrentChapterData, type CurrentChapterData } from "../contexts/currentChapter";
	import { initChapterCurrentPageContext } from "../contexts/currentPage";
	import { initChapterImageContext } from "../contexts/images";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { initIsDrawerFixedWritable } from "../contexts/isDrawerFixed";
	import { initCurrentChapterReadingMode } from "../contexts/currentChapterReadingMode";
	import ChapterPage from "../ChapterPage.svelte";
	import { initIsDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import { initLongStripImagesWidthContext } from "../readinMode/longStrip/utils/context/longstrip_images_width";

	export let chapter: CurrentChapterData;
	export let images: string[];
	export let currentPage: number = 0;
	export let readingMode: ReadingMode = ReadingMode.SinglePage;
	export let isFixed = false;
	export let isMenuOpen = false;
	export let longStripImageWidth = 0;
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
</script>

<div>
	<ChapterPage />
</div>

<style lang="scss">
	div {
		height: 100vh;
	}
</style>
