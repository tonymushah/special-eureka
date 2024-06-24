<script lang="ts">
	import { derived } from "svelte/store";
	import getChapterDoublePageCurrentPage from "./utils/getChapterDoublePageCurrentPage";
	import getChapterDoublePageCurrentPageIndex from "./utils/getChapterDoublePageCurrentPageIndex";
	import getChapterImagesAsDoublePage from "./utils/getChapterImagesAsDoublePage";
	import { createEventDispatcher } from "svelte";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import { currentChapterPage } from "../../stores/currentPage";
	import getChapterDoublePageIndexes from "./utils/getChapterDoublePageIndexes";
	import { ceil, isArray, random } from "lodash";
	import { blur, fade } from "svelte/transition";
	import { quadIn, quadOut } from "svelte/easing";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";

	const currentPage = getChapterDoublePageCurrentPage();
	const currentPageIndex = getChapterDoublePageCurrentPageIndex();
	const images_indexes = getChapterDoublePageIndexes();
	const images = getChapterImagesAsDoublePage();
	const images_length = derived(images, ($imgs) => $imgs.length);
	const dispatch = createEventDispatcher<{
		next: {};
		previous: {};
	}>();
	$: next = function () {
		if ($currentPageIndex < $images_length - 1) {
			currentChapterPage.update(() => {
				const index = $images_indexes[$currentPageIndex + 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else {
					return index;
				}
			});
		} else {
			dispatch("next", {});
		}
	};
	$: previous = function () {
		if ($currentPageIndex > 0) {
			currentChapterPage.update(() => {
				const index = $images_indexes[$currentPageIndex - 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else {
					return index;
				}
			});
		} else {
			dispatch("previous", {});
		}
	};
</script>

<svelte:window
	on:keydown={(e) => {
		const direction = $readingDirection;
		const onNext = function () {
			switch (direction) {
				case ReadingDirection.Ltr:
					next();
					break;
				case ReadingDirection.Rtl:
					previous();
					break;
				default:
					break;
			}
		};
		const onPrevious = function () {
			switch (direction) {
				case ReadingDirection.Ltr:
					previous();
					break;
				case ReadingDirection.Rtl:
					next();
					break;
				default:
					break;
			}
		};
		switch (e.key) {
			case $chapterKeyBindingsStore.next:
				e.preventDefault();
				onNext();
				break;
			case $chapterKeyBindingsStore.previous:
				e.preventDefault();
				onPrevious();
				break;
			default:
				break;
		}
	}}
/>

{#if $currentPage}
	<div class="double-page">
		{#key $currentPage}
			<div
				transition:blur={{
					duration: 100,
					easing: quadOut
				}}
			>
				<ZoomableImage src={$currentPage} alt={$currentPage} />
			</div>
		{/key}
	</div>
{/if}
