<script lang="ts">
	import { writable } from "svelte/store";
	import { initChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import Page from "../DoublePage.svelte";
	import { ImageFit, Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { initCurrentChapterDirection } from "../../../contexts/readingDirection";
	import { initCurrentChapterImageFit } from "../../../contexts/imageFit";
	interface Props {
		images: string[];
		currentPage?: number;
		direction?: ReadingDirection;
		imageFit?: any;
	}

	let {
		images = $bindable(),
		currentPage = $bindable(0),
		direction = $bindable(ReadingDirection.Ltr),
		imageFit = $bindable(ImageFit.Default)
	}: Props = $props();

	const readingDirection = initCurrentChapterDirection(writable(direction));
	const imageFitStore = initCurrentChapterImageFit(writable(imageFit));
	$effect(() => {
		readingDirection.set(direction);
	});
	$effect(() => {
		imageFitStore.set(imageFit);
	});
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

<Page />

<style lang="scss">
	.image-fit {
		button.active {
			background-color: bisque;
			border-radius: 5px;
		}
	}
</style>
