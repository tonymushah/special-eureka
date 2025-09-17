<script lang="ts">
	import { derived, writable, type Readable } from "svelte/store";
	import {
		getLongStripImagesWidthContext,
		getLongStripImagesWidthContextWritable
	} from "./utils/context/longstrip_images_width";
	import { onMount } from "svelte";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import type { Action } from "svelte/action";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import ChapterPages from "@mangadex/stores/chapter/pages";
	import { zoomSpeedValue } from "../zoomableImage/settings";
	import { debounce } from "lodash";
	import type { WheelEventHandler } from "svelte/elements";

	interface Props {
		innerOverflow?: boolean;
		top?: import("svelte").Snippet;
		bottom?: import("svelte").Snippet;
	}

	let { innerOverflow = true, top, bottom }: Props = $props();
	const currentChapterPage = getChapterCurrentPageContext();
	let longstrip_root: HTMLDivElement | undefined = undefined;
	const images_root_data = getCurrentChapterImages();
	const images = derived(images_root_data, ($data) => $data.getPagesState());

	const imageWidth = derived(getLongStripImagesWidthContext(), ($width) => {
		if ($width == 0) {
			return 100;
		} else {
			return Math.abs($width);
		}
	});
	const isFromIntersector = writable(false);
	let shouldIgnore = false;
	function fromIntersector<T = unknown>(fn: () => T): T {
		shouldIgnore = true;
		isFromIntersector.set(true);
		try {
			return fn();
		} catch (error) {
			throw error;
		} finally {
			isFromIntersector.set(false);
			shouldIgnore = false;
		}
	}
	const currentChapter: Readable<[number, boolean]> = derived(
		[currentChapterPage, isFromIntersector],
		([$page, $fromInter]) => {
			return [$page, $fromInter] satisfies [number, boolean];
		}
	);
	onMount(() => {
		return currentChapter.subscribe(([page, fromInter]) => {
			if (!shouldIgnore && !fromInter) {
				if (longstrip_root != undefined) {
					const current = longstrip_root.querySelector(`div[data-page=\"${page}\"]`);
					if (current != null) {
						current.scrollIntoView({
							block: "nearest"
						});
					}
				}
			}
		});
	});
	const interObserver = new IntersectionObserver(
		(entries) => {
			/*
                console.debug(`intersected ${entries.length}`);
                console.debug(
                    entries.map((entry) => ({
                        ratio: entry.intersectionRatio,
                        page: entry.target.getAttribute("data-page")
                    }))
                );
            */
			const entry = entries.reduce((previous, current) => {
				if (previous.intersectionRatio < current.intersectionRatio) {
					return current;
				} else {
					return previous;
				}
			});
			//const isInitialLoading = entry.target.getAttribute("data-initial-loading");

			const page = entry.target.getAttribute("data-page");
			if (page != null) {
				if (entry.isIntersecting /*&& entry.intersectionRatio > 0*/) {
					fromIntersector(() => {
						currentChapterPage.set(Number(page));
					});
				}
			}
		},
		{
			root: longstrip_root
		}
	);
	const mount: Action = (node) => {
		interObserver.observe(node);
		return {
			destroy() {
				interObserver.unobserve(node);
			}
		};
	};
	const widthWritable = getLongStripImagesWidthContextWritable();
	//onMount(() => currentChapter.subscribe(([p]) => console.debug(p)));
	let isCtrlPressed = $state(false);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.ctrlKey) {
			isCtrlPressed = true;
		}
	}}
	onkeyup={(e) => {
		if (e.ctrlKey) {
			isCtrlPressed = false;
		}
	}}
/>

<div
	class="longstrip"
	class:innerOverflow
	bind:this={longstrip_root}
	onwheel={(e) => {
		if (isCtrlPressed) {
			e.preventDefault();
			e.stopPropagation();
			let width = $imageWidth;
			width += e.deltaY * (-0.1 * $zoomSpeedValue);
			$widthWritable = Math.min(Math.max(0, width), 100);
		}
	}}
>
	{@render top?.()}
	{#each $images as image, page}
		<div data-page={page} use:mount class="image">
			{#if image?.page}
				<img
					data-page={page}
					src={image.page.value}
					alt={image.page.value}
					width="{$imageWidth}%"
				/>
			{:else if image?.error}
				<div class="error">
					<p>{image.error.name} ({image.error.message})</p>
					<div class="_inner">
						<DangerButtonOnlyLabel
							label="Error"
							onclick={() => {
								ChapterPages.removePageError(images_root_data, page);
								images_root_data.refetchChapterPage(page);
							}}
						/>
					</div>
				</div>
			{:else}
				<p>Loadign...</p>
			{/if}
		</div>
	{/each}
	{@render bottom?.()}
</div>

<style lang="scss">
	.longstrip {
		display: flex;
		flex-direction: column;
		.image {
			display: flex;
			width: 100%;
			justify-content: center;
		}
	}
	.longstrip.innerOverflow {
		height: 100%;
		width: 100%;
		overflow-y: scroll;
	}
	.error {
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
	}
</style>
