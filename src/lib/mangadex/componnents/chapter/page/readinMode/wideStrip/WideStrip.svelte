<!--
    TODO Add drag support for scrolling
-->
<script lang="ts">
	import { preventDefault, createBubbler } from "svelte/legacy";

	const bubble = createBubbler();
	import { derived as der, get, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { onDestroy, onMount } from "svelte";
	import { delay } from "lodash";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import type { Action } from "svelte/action";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";

	const readingDirection = getCurrentChapterDirection();
	let widestrip_root: HTMLDivElement | undefined = $state();
	const images = getChapterImageContext();
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
	}

	let { innerOverflow = true, top, before, after, bottom }: Props = $props();

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
    on:mousedown={(e) => {
		if (widestrip_root) {
			isDown.set(true);
			startX.set(e.clientX - widestrip_root.scrollLeft);
			scrollLeft.set(widestrip_root.scrollLeft);
		}
	}}
	on:mouseup={(e) => {
		isDown.set(false);
	}}
	on:mousemove={(e) => {
		if ($isDown && widestrip_root) {
			e.preventDefault();
			widestrip_root.scrollLeft -= $scrollLeft - $startX;
		}
	}}
	on:mouseleave={(e) => {
		isDown.set(false);
	}}
    */
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
>
	{@render before?.()}
	{#each $images as image, page}
		<div data-page={page} use:mount>
			<img ondrag={preventDefault(bubble("drag"))} src={image} alt={image} data-page={page} />
		</div>
	{/each}
	{@render after?.()}
</div>

{@render bottom?.()}

<style lang="scss">
	.wide-strip {
		display: flex;
		flex-direction: row;
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
		width: 100%;
		height: 100%;
		scroll-behavior: smooth;
	}
	img {
		height: 100%;
	}
</style>
