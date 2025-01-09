<!-- TODO @migration-task Error while migrating Svelte code: can't migrate `$: next = function () {
		if ($currentPageIndex < $images_length - 1) {
			resetZoom();
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
	};` to `$derived` because there's a variable named derived.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
	import { ceil, isArray, random } from "lodash";
	import { createEventDispatcher } from "svelte";
	import { quadOut } from "svelte/easing";
	import { derived } from "svelte/store";
	import { blur } from "svelte/transition";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";
	import getChapterDoublePageCurrentPage from "./utils/getChapterDoublePageCurrentPage";
	import getChapterDoublePageCurrentPageIndex from "./utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "./utils/getChapterDoublePageIndexes";
	import getChapterImagesAsDoublePage from "./utils/getChapterImagesAsDoublePage";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import { Direction } from "@mangadex/gql/graphql";
	import { resetZoom } from "../../contexts/resetZoomEventTarget";

	const readingDirection = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();
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
			resetZoom();
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
			resetZoom();
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
				case Direction.Ltr:
					next();
					break;
				case Direction.Rtl:
					previous();
					break;
				default:
					break;
			}
		};
		const onPrevious = function () {
			switch (direction) {
				case Direction.Ltr:
					previous();
					break;
				case Direction.Rtl:
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
		<ZoomableImage src={$currentPage} alt={$currentPage} />
	</div>
{/if}

<style lang="scss">
	div {
		display: contents;
	}
</style>
