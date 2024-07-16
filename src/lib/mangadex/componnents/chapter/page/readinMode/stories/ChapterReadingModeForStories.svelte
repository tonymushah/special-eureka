<script lang="ts">
	import { writable } from "svelte/store";
	import { initChapterCurrentPageContext } from "../../contexts/currentPage";
	import { initChapterImageContext } from "../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { ImageFit, imageFitStore } from "../zoomableImage/settings";
	import Page from "../ChapterReadingMode.svelte";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { initCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { initLongStripImagesWidthContext } from "../longStrip/utils/context/longstrip_images_width";

	export let images: string[];
	export let currentPage: number = 0;
	export let readingMode: ReadingMode = ReadingMode.SinglePage;
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
			$imageFitStore = ImageFit.None;
		}}
		class:active={$imageFitStore == ImageFit.None}
	>
		None
	</button>
	<button
		on:click={() => {
			$imageFitStore = ImageFit.Height;
		}}
		class:active={$imageFitStore == ImageFit.Height}
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
