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

	export let images: string[];
	export let currentPage: number = 0;
	export let readingMode: ReadingMode = ReadingMode.SinglePage;
	export let imageFit = ImageFit.Default;
	export let direction = Direction.Ltr;

	const readingDirection = initCurrentChapterDirection(writable(direction));
	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	$: readingDirection.set(direction);
	$: imageFitStore.set(imageFit);

	initChapterImageContext(images);
	const mode = initCurrentChapterReadingMode(writable(readingMode));
	$: mode.set(readingMode);
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
		on:click={() => {
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
		on:click={() => {
			$imageFitStore = ImageFit.Default;
		}}
		class:active={$imageFitStore == ImageFit.Default}
	>
		None
	</button>
	<button
		on:click={() => {
			$imageFitStore = ImageFit.Heigth;
		}}
		class:active={$imageFitStore == ImageFit.Heigth}
	>
		Height
	</button>
	<button
		on:click={() => {
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
