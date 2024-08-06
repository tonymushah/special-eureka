<script lang="ts">
	import { writable } from "svelte/store";
	import { initChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import Page from "../DoublePage.svelte";
	import { ImageFit, Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { initCurrentChapterDirection } from "../../../contexts/readingDirection";
	import { initCurrentChapterImageFit } from "../../../contexts/imageFit";
	export let images: string[];
	export let currentPage: number = 0;
	export let direction: ReadingDirection = ReadingDirection.Ltr;
	export let imageFit = ImageFit.Default;

	const readingDirection = initCurrentChapterDirection(writable(direction));
	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	$: readingDirection.set(direction);
	$: imageFitStore.set(imageFit);
	initChapterImageContext(images);
	initChapterCurrentPageContext(writable(currentPage));
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

<Page />

<style lang="scss">
	.image-fit {
		button.active {
			background-color: bisque;
			border-radius: 5px;
		}
	}
</style>
