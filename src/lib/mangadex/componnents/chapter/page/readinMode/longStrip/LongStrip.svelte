<script lang="ts">
	import { derived, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { getLongStripImagesWidthContext } from "./utils/context/longstrip_images_width";
	import { onMount } from "svelte";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";

	const currentChapterPage = getChapterCurrentPageContext();
	let longstrip_root: HTMLDivElement | undefined;
	const images = getChapterImageContext();
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
						current.scrollIntoView();
					}
				}
			}
		});
	});
	const interObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const isInitialLoading = entry.target.getAttribute("data-initial-loading");
				if (isInitialLoading == "true") {
					entry.target.setAttribute("data-initial-loading", "false");
				} else {
					const page = entry.target.getAttribute("data-page");
					if (page != null) {
						if (entry.isIntersecting && entry.intersectionRatio > 0) {
							fromIntersector(() => {
								currentChapterPage.set(Number(page));
							});
						}
					}
				}
			});
		},
		{
			root: longstrip_root
		}
	);
</script>

<div class="longstrip" bind:this={longstrip_root}>
	<slot name="top" />
	{#each $images as image, page}
		<div data-page={page}>
			<img
				data-initial-loading="true"
				data-page={page}
				on:load={(e) => {
					interObserver.observe(e.currentTarget);
				}}
				src={image}
				alt={image}
				width="{$imageWidth}%"
			/>
		</div>
	{/each}
	<slot name="bottom" />
</div>

<style lang="scss">
	img {
		max-width: 100%;
	}
</style>
