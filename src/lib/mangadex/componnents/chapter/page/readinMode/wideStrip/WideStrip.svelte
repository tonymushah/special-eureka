<!--
    [x] Add drag support for scrolling
    Ref: https://stackoverflow.com/questions/76066584/how-to-enable-touch-like-scrolling-by-grabbing-and-dragging-with-the-mouse#76066874
-->
<script lang="ts">
	import { derived as der, get, writable, type Readable } from "svelte/store";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { onDestroy, onMount } from "svelte";
	import { delay } from "lodash";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import type { Action } from "svelte/action";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import type { OnReadingModeContextMenu } from "..";

	const readingDirection = getCurrentChapterDirection();
	let widestrip_root: HTMLDivElement | undefined = $state();

	const images_root_data = getCurrentChapterImages();
	let images = $derived.by(() => images_root_data.pagesState);

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
			delay(() => {
				isFromIntersector.set(false);
				shouldIgnore = false;
			}, 1);
		}
	}
	const currentChapterPage = getChapterCurrentPageContext();
	const currentChapter: Readable<[number, boolean]> = der(
		[currentChapterPage, isFromIntersector],
		([$page, $fromInter]) => {
			return [$page, $fromInter] satisfies [number, boolean];
		}
	);
	function toCurrentPage(page: number) {
		//console.log(page);
		const current = widestrip_root?.querySelector(`div[data-page=\"${page}\"]`);
		if (current != null) {
			current.scrollIntoView();
		}
	}
	onMount(() => {
		return currentChapter.subscribe(([page, fromInter]) => {
			if (!shouldIgnore && !fromInter) {
				if (widestrip_root != undefined) {
					toCurrentPage(page);
				}
			}
		});
	});
	interface Props {
		innerOverflow?: boolean;
		top?: import("svelte").Snippet;
		before?: import("svelte").Snippet;
		after?: import("svelte").Snippet;
		bottom?: import("svelte").Snippet;
		oncontextmenu?: OnReadingModeContextMenu;
	}

	let { innerOverflow = true, top, before, after, bottom, oncontextmenu }: Props = $props();

	let toObserve: Element[] = $state([]);
	// TODO Add support with the intersection observer API
	let interObserver = $derived(
		new IntersectionObserver(
			(entries) => {
				// console.debug(entries.length);
				const entry = entries.reduce((previous, current) => {
					if (previous.intersectionRatio < current.intersectionRatio) {
						return current;
					} else {
						return previous;
					}
				});
				/*const isInitialLoading = entry.target.getAttribute("data-initial-loading");
			if (isInitialLoading == "true") {
				entry.target.setAttribute("data-initial-loading", "false");
			} else {*/
				const page = entry.target.getAttribute("data-page");
				if (page != null) {
					if (entry.isIntersecting /*&& entry.intersectionRatio > 0*/) {
						fromIntersector(() => {
							currentChapterPage.set(Number(page));
						});
					}
				}
				//}
			},
			{
				root: widestrip_root
			}
		)
	);
	$effect(() => {
		toObserve.forEach((e) => {
			interObserver.unobserve(e);
			interObserver.observe(e);
		});
	});
	const rtl = der(readingDirection, ($readingDirection) => {
		toObserve.forEach((entry) => {
			interObserver.unobserve(entry);
			entry.setAttribute("data-initial-loading", "true");
		});
		return $readingDirection == ReadingDirection.Rtl;
	});
	onMount(() =>
		readingDirection.subscribe(() => {
			delay(() => {
				const entries = toObserve;
				/*
                entries.forEach((entry) => {
                    interObserver.unobserve(entry);
                    entry.setAttribute("data-initial-loading", "true");
                });
                */
				const currentPage = get(currentChapterPage);
				toCurrentPage(currentPage);
				entries.forEach((entry) => {
					interObserver.observe(entry);
				});
			}, 5);
		})
	);
	const mount: Action = (node) => {
		toObserve = [...toObserve, node];
		return {
			destroy() {
				toObserve = toObserve.filter((e) => node != e);
			}
		};
	};
	onDestroy(() => {
		interObserver.disconnect();
	});
	/*
	const isDown = writable(false);
	const startX = writable(0);
	const scrollLeft = writable(0);
	$: console.debug({
		isDown: $isDown,
		startX: $startX,
		scrollLeft: $scrollLeft
	});
    onmousedown={(e) => {
		if (widestrip_root) {
			isDown.set(true);
			startX.set(e.clientX - widestrip_root.scrollLeft);
			scrollLeft.set(widestrip_root.scrollLeft);
		}
	}}
	onmouseup={(e) => {
		isDown.set(false);
	}}
	onmousemove={(e) => {
		if ($isDown && widestrip_root) {
			e.preventDefault();
			widestrip_root.scrollLeft -= $scrollLeft - $startX;
		}
	}}
	onmouseleave={(e) => {
		isDown.set(false);
	}}
    */
	let isDown = false;
	let startX: number | undefined = undefined;
	let startY: number | undefined = undefined;
	let scrollLeft: number | undefined = undefined;
	let scrollTop: number | undefined = undefined;
</script>

{@render top?.()}

<div
	role="button"
	tabindex="0"
	class="wide-strip"
	class:rtl={$rtl}
	class:innerOverflow
	bind:this={widestrip_root}
	onwheel={(e) => {
		e.preventDefault();
		if (widestrip_root) {
			if ($rtl) {
				widestrip_root.scrollLeft -= e.deltaY;
			} else {
				widestrip_root.scrollLeft += e.deltaY;
			}
		}
	}}
	onmousedown={(e) => {
		if (widestrip_root) {
			isDown = true;
			startX = e.pageX - widestrip_root.offsetLeft;
			startY = e.pageY - widestrip_root.offsetTop;
			scrollLeft = widestrip_root.scrollLeft;
			scrollTop = widestrip_root.scrollTop;
			widestrip_root.style.cursor = "grabbing";
		}
	}}
	onmouseleave={(e) => {
		if (widestrip_root) {
			isDown = false;
			widestrip_root.style.cursor = "grab";
		}
	}}
	onmouseup={(e) => {
		if (widestrip_root) {
			isDown = false;
			widestrip_root.style.cursor = "grab";
		}
	}}
	onmousemove={(e) => {
		if (
			widestrip_root != undefined &&
			startX != undefined &&
			startY != undefined &&
			scrollLeft != undefined &&
			scrollTop != undefined
		) {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - widestrip_root.offsetLeft;
			const y = e.pageY - widestrip_root.offsetTop;
			const walkX = (x - startX) * 1; // Change this number to adjust the scroll speed
			const walkY = (y - startY) * 1; // Change this number to adjust the scroll speed
			widestrip_root.scrollLeft = scrollLeft - walkX;
			widestrip_root.scrollTop = scrollTop - walkY;
		}
	}}
>
	{@render before?.()}
	{#each images as image, page}
		<div data-page={page} use:mount>
			{#if image?.page}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					data-page={page}
					src={image.page.value}
					alt={image.page.value}
					onmousedown={(e) => {
						e.preventDefault();
					}}
					oncontextmenu={(e) => {
						oncontextmenu?.(Object.assign(e, { pageNumber: page }));
					}}
				/>
			{:else if image?.error}
				<div class="error">
					<p>{image.error.name} ({image.error.message})</p>
					<div class="_inner">
						<DangerButtonOnlyLabel
							label="Error"
							onclick={() => {
								images_root_data.removePageError(page);
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
	{@render after?.()}
</div>

{@render bottom?.()}

<style lang="scss">
	.wide-strip {
		display: flex;
		flex-direction: row;
		user-select: none;
		div {
			display: flex;
			height: 100%;
			img {
				height: 100%;
			}
		}
	}
	.wide-strip.rtl {
		flex-direction: row-reverse;
	}
	.wide-strip.innerOverflow {
		overflow-x: scroll;
		scrollbar-width: none;
		width: 100%;
		height: 100%;
		cursor: grab;
		/* scroll-behavior: smooth; */
	}
	.wide-strip.innerOverflow::-webkit-scrollbar {
		display: none;
		/* For Chrome, Safari, and Edge */
	}
	img {
		height: 100%;
		user-select: none;
	}
	.error {
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
	}
</style>
