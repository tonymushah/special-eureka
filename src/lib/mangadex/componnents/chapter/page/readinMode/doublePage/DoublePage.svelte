<script lang="ts">
	import { Direction } from "@mangadex/gql/graphql";
	import { ceil, isArray, noop, random } from "lodash";
	import { onMount, type Snippet } from "svelte";
	import { derived } from "svelte/store";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import { resetZoom } from "../../contexts/resetZoomEventTarget";
	import { chapterKeyBindingsStore } from "../../stores/keyBindings";
	import ZoomableImage from "../zoomableImage/ZoomableImage.svelte";
	import getChapterDoublePageCurrentPageIndex from "./utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "./utils/getChapterDoublePageIndexes";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
	import type { DoublePageState } from "@mangadex/stores/chapter/pages";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import ChapterPages from "@mangadex/stores/chapter/pages";

	const readingDirection = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();
	const currentPageIndex = getChapterDoublePageCurrentPageIndex();
	const images_indexes = getChapterDoublePageIndexes();
	const images = getCurrentChapterImages();
	const images_length = derived(images, ($imgs) => $imgs.pagesAsDoublePageIndexes().length);
	const currentPage = derived(
		[images, currentPageIndex, readingDirection],
		([$imgs, $index, $direction]) => {
			const doublePageMaybe = $imgs.getDoublePageState($index);
			if (isArray(doublePageMaybe) && $readingDirection == Direction.Rtl) {
				return [doublePageMaybe[1], doublePageMaybe[0]] satisfies DoublePageState;
			} else {
				return doublePageMaybe satisfies DoublePageState;
			}
		}
	);

	interface Events {
		onnext?: () => any;
		onprevious?: () => any;
	}

	interface Props extends Events {
		children?: Snippet;
	}

	let { onnext, onprevious, children }: Props = $props();

	/// BUG or more like shit code xd
	/// Required or else the component may not work proprely
	onMount(() => images_indexes.subscribe(noop));
	onMount(() => images.subscribe(noop));
	onMount(() => currentPage.subscribe(noop));
	onMount(() => currentChapterPage.subscribe(noop));
	onMount(() => currentPageIndex.subscribe(noop));
	function next() {
		if ($currentPageIndex < $images_length - 1) {
			resetZoom();
			currentChapterPage.update((i) => {
				const index = $images_indexes[$currentPageIndex + 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else if (typeof index == "number" && !isNaN(index)) {
					return index;
				} else {
					return i;
				}
			});
		} else {
			onnext?.();
		}
	}
	function previous() {
		if ($currentPageIndex > 0) {
			resetZoom();
			currentChapterPage.update((i) => {
				const index = $images_indexes[$currentPageIndex - 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else if (typeof index == "number" && !isNaN(index)) {
					return index;
				} else {
					return i;
				}
			});
		} else {
			onprevious?.();
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
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
	onfocus={() => {
		resetZoom();
	}}
/>

{#if $currentPage}
	<div class="double-page">
		{#if isArray($currentPage)}
			{@const p1 = $currentPage[0]}
			{@const p2 = $currentPage[1]}
			{#if p1?.page && p2?.page}
				<ZoomableImage
					src={[p1.page.value, p2.page.value]}
					alt={[p1.page.value, p2.page.value]}
				/>
			{:else}
				<div class="disabled-zoom">
					{#if p1?.page}
						<ZoomableImage src={p1.page.value} alt={p1.page.value} noZoom />
					{:else if p1?.error}
						<div class="error">
							<div class="_inner">
								<p>{p1.error.name} ({p1.error.message})</p>
								<DangerButtonOnlyLabel
									label="Error"
									onclick={() => {
										const pageIndex = $images_indexes.at($currentPageIndex);
										if (isArray(pageIndex)) {
											ChapterPages.removePageError(
												images,
												pageIndex[
													$readingDirection == Direction.Ltr ? 0 : 1
												]
											);
											images.refetchChapterPage(
												pageIndex[
													$readingDirection == Direction.Ltr ? 0 : 1
												]
											);
										} else if (typeof pageIndex == "number") {
											ChapterPages.removePageError(images, pageIndex);
											images.refetchChapterPage(pageIndex);
										}
									}}
								/>
							</div>
						</div>
					{:else}
						<div class="error">
							<div class="_inner">Loadign...</div>
						</div>
					{/if}

					{#if p2?.page}
						<ZoomableImage src={p2.page.value} alt={p2.page.value} noZoom />
					{:else if p2?.error}
						<div class="error">
							<div class="_inner">
								<p>{p2.error.name} ({p2.error.message})</p>
								<DangerButtonOnlyLabel
									label="Error"
									onclick={() => {
										const pageIndex = $images_indexes.at($currentPageIndex);
										if (isArray(pageIndex)) {
											ChapterPages.removePageError(
												images,
												pageIndex[
													$readingDirection == Direction.Ltr ? 1 : 0
												]
											);
											images.refetchChapterPage(
												pageIndex[
													$readingDirection == Direction.Ltr ? 1 : 0
												]
											);
										} else if (typeof pageIndex == "number") {
											ChapterPages.removePageError(images, pageIndex);
											images.refetchChapterPage(pageIndex);
										}
									}}
								/>
							</div>
						</div>
					{:else}
						<div class="error">
							<div class="_inner">Loadign...</div>
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
{/if}

<style lang="scss">
	div {
		display: contents;
	}
	div.disabled-zoom {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-columns: 100%;
	}
	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
</style>
