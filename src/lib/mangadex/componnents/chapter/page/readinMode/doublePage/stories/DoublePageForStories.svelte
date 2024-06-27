<script lang="ts">
	import { writable } from "svelte/store";
	import { initChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
	import Page from "../DoublePage.svelte";
	import { ImageFit, imageFitStore } from "../../zoomableImage/settings";
	export let images: string[];
	export let currentPage: number = 0;
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

<Page />

<style lang="scss">
	.image-fit {
		button.active {
			background-color: bisque;
			border-radius: 5px;
		}
	}
</style>
