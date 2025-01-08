<script lang="ts">
	import { derived, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { getLongStripImagesWidthContext } from "./utils/context/longstrip_images_width";
	import { onMount } from "svelte";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import type { Action } from "svelte/action";

	interface Props {
		innerOverflow?: boolean;
		top?: import('svelte').Snippet;
		bottom?: import('svelte').Snippet;
	}

	let { innerOverflow = true, top, bottom }: Props = $props();
	const currentChapterPage = getChapterCurrentPageContext();
	let longstrip_root: HTMLDivElement | undefined = $state();
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
	//onMount(() => currentChapter.subscribe(([p]) => console.debug(p)));
</script>

<div class="longstrip" class:innerOverflow bind:this={longstrip_root}>
	{@render top?.()}
	{#each $images as image, page}
		<div data-page={page} use:mount class="image">
			<img data-page={page} src={image} alt={image} width="{$imageWidth}%" />
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
</style>
