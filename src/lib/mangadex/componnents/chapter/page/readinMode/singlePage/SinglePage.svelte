<script lang="ts">
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import { resetZoom } from "../../contexts/resetZoomEventTarget";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
	import { derived as der } from "svelte/store";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import ChapterPages from "@mangadex/stores/chapter/pages";

	const readingDirection = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();

	interface Events {
		onnext?: () => any;
		onprevious?: () => any;
	}

	interface Props extends Events {}

	let { onnext, onprevious }: Props = $props();

	const images = getCurrentChapterImages();

	const images_len = der(images, ($images) => $images.pagesLen);

	let next = $derived(function () {
		if ($images_len) {
			if ($currentChapterPage < $images_len - 1) {
				resetZoom();
				$currentChapterPage++;
			} else {
				onnext?.();
			}
		}
	});
	let previous = $derived(function () {
		if ($currentChapterPage > 0) {
			resetZoom();
			$currentChapterPage--;
		} else {
			onprevious?.();
		}
	});
	let current_page = $derived($images.getPageState($currentChapterPage));
	/*
	$: previous_p = $images_context[$currentChapterPage - 1];
	$: next_p = $images_context[$currentChapterPage + 1];
	$: previous_page = $readingDirection == ReadingDirection.Ltr ? previous_p : next_p;
	$: next_page = $readingDirection == ReadingDirection.Ltr ? next_p : previous_p;
    */
</script>

<svelte:window
	onkeydown={(e) => {
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
	onfocus={() => {
		resetZoom();
	}}
/>
<!--

-->

{#if current_page}
	<div class="single-page">
		{#if current_page.page}
			{@const page = current_page.page}
			<ZoomableImage src={page.value} alt={page.value} />
		{:else}
			{@const error = current_page.error}
			<div class="error">
				<div class="inner_">
					<p>{error.name} ({error.message})</p>
					<DangerButtonOnlyLabel
						label="Retry"
						onclick={() => {
							ChapterPages.removePageError(images, $currentChapterPage);
							images.refetchChapterPage($currentChapterPage);
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="error">
		<div class="_inner">
			<p>Loadign...</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.single-page {
		height: 100%;
		display: contents;
	}
	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	._inner {
		border: 3px dashed var(--mid-tone);
		opacity: 0.9;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		width: 75%;
		height: 75%;
	}
</style>
