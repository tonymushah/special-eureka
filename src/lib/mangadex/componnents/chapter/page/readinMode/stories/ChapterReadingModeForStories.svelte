<script lang="ts">
	import { writable } from "svelte/store";
	import { initChapterCurrentPageContext } from "../../contexts/currentPage";
	import { initChapterImageContext } from "../../contexts/images";
	import Page from "../ChapterReadingMode.svelte";
	import { Direction, ImageFit, Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { initCurrentChapterDirection } from "../../contexts/readingDirection";
	import { initCurrentChapterImageFit } from "../../contexts/imageFit";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { initCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { initLongStripImagesWidthContext } from "../longStrip/utils/context/longstrip_images_width";
	import { initIsDrawerOpenWritable } from "../../contexts/isDrawerOpen";
	import { initIsDrawerFixedWritable } from "../../contexts/isDrawerFixed";

	interface Props {
		images: string[];
		currentPage?: number;
		readingMode?: ReadingMode;
		imageFit?: any;
		direction?: any;
	}

	let {
		images = $bindable(),
		currentPage = $bindable(0),
		readingMode = $bindable(ReadingMode.SinglePage),
		imageFit = $bindable(ImageFit.Default),
		direction = $bindable(Direction.Ltr)
	}: Props = $props();

	const readingDirection = initCurrentChapterDirection(writable(direction));
	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	initIsDrawerOpenWritable(writable(false));
	initIsDrawerFixedWritable(writable(true));
	$effect(() => {
		readingDirection.set(direction);
	});
	$effect(() => {
		imageFitStore.set(imageFit);
	});

	initChapterImageContext(images);
	const mode = initCurrentChapterReadingMode(writable(readingMode));
	$effect(() => {
		mode.set(readingMode);
	});
	initChapterCurrentPageContext(writable(currentPage));
	initLongStripImagesWidthContext(writable(0));
</script>

<div>
	<span> Current mode: </span>
	<span>
		{#if $readingDirection == ReadingDirection.Ltr}
			Left to Right
		{:else}
			Right to Left
		{/if}
	</span>
	<button
		onclick={() => {
			switch ($readingDirection) {
				case ReadingDirection.Ltr:
					readingDirection.set(ReadingDirection.Rtl);
					break;
				case ReadingDirection.Rtl:
					readingDirection.set(ReadingDirection.Ltr);
					break;
				default:
					break;
			}
		}}
	>
		Switch mode
	</button>
</div>

<div class="image-fit">
	<span> Image Fit: </span>
	<button
		onclick={() => {
			$imageFitStore = ImageFit.Default;
		}}
		class:active={$imageFitStore == ImageFit.Default}
	>
		None
	</button>
	<button
		onclick={() => {
			$imageFitStore = ImageFit.Heigth;
		}}
		class:active={$imageFitStore == ImageFit.Heigth}
	>
		Height
	</button>
	<button
		onclick={() => {
			$imageFitStore = ImageFit.Width;
		}}
		class:active={$imageFitStore == ImageFit.Width}
	>
		Width
	</button>
</div>

<section>
	<Page />
</section>

<style lang="scss">
	section {
		height: 100vh;
	}
</style>
