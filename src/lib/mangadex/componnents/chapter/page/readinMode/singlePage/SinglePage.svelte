<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { quintOut } from "svelte/easing";
	import { blur } from "svelte/transition";
	import { getChapterImageContext } from "../../contexts/images";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import { resetZoom } from "../../contexts/resetZoomEventTarget";

	const readingDirection = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();
	const dispatch = createEventDispatcher<{
		next: {};
		previous: {};
	}>();
	const images_context = getChapterImageContext();
	$: next = function () {
		if ($currentChapterPage < $images_context.length - 1) {
			resetZoom();
			$currentChapterPage++;
		} else {
			dispatch("next", {});
		}
	};
	$: previous = function () {
		if ($currentChapterPage > 0) {
			resetZoom();
			$currentChapterPage--;
		} else {
			dispatch("previous", {});
		}
	};
	$: current_page = $images_context.at($currentChapterPage);
	/*
	$: previous_p = $images_context[$currentChapterPage - 1];
	$: next_p = $images_context[$currentChapterPage + 1];
	$: previous_page = $readingDirection == ReadingDirection.Ltr ? previous_p : next_p;
	$: next_page = $readingDirection == ReadingDirection.Ltr ? next_p : previous_p;
    */
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
<!--

-->
{#if current_page}
	<div class="single-page">
		<ZoomableImage src={current_page} alt={current_page} />
	</div>
{/if}

<style lang="scss">
	.single-page {
		height: 100%;
		display: contents;
	}
</style>
