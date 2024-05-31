<script lang="ts">
	import { currentChapterPage } from "../../stores/currentPage";
	import { getChapterImageContext } from "../../contexts/images";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { elasticInOut } from "svelte/easing";

	const dispatch = createEventDispatcher<{
		next: {};
		previous: {};
	}>();
	const images_context = getChapterImageContext();
	$: next = function () {
		if ($currentChapterPage < $images_context.length - 1) {
			$currentChapterPage++;
		} else {
			dispatch("next", {});
		}
	};
	$: previous = function () {
		if ($currentChapterPage > 0) {
			$currentChapterPage--;
		} else {
			dispatch("previous", {});
		}
	};
	$: current_page = $images_context[$currentChapterPage];
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

{#if current_page}
	<div class="single-page">
		{#key current_page}
			<div
				transition:slide={{
					axis: "y"
				}}
			>
				<ZoomableImage src={current_page} alt={current_page} />
			</div>
		{/key}
	</div>
{/if}

<style lang="scss">
</style>
