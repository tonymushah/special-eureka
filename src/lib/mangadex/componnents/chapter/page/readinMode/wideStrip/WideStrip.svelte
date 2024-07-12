<!--
    TODO Add drag support for scrolling
-->
<script lang="ts">
	import { derived, get, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { onMount } from "svelte";
	import { delay } from "lodash";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import type { Action } from "svelte/action";
	let widestrip_root: HTMLDivElement | undefined;
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
	const currentChapter: Readable<[number, boolean]> = derived(
		[currentChapterPage, isFromIntersector],
		([$page, $fromInter]) => {
			return [$page, $fromInter] satisfies [number, boolean];
		}
	);
	function toCurrentPage(page: number) {
		console.log(page);
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
	export let innerOverflow = true;

	let toObserve: Element[] = [];
	// TODO Add support with the intersection observer API
	const interObserver = new IntersectionObserver(
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
	);
	$: toObserve.forEach((e) => {
		interObserver.unobserve(e);
		interObserver.observe(e);
	});
	const rtl = derived(readingDirection, ($readingDirection) => {
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
</script>

<slot name="top" />

<div
	role="article"
	class="wide-strip"
	class:rtl={$rtl}
	class:innerOverflow
	bind:this={widestrip_root}
	on:drag|preventDefault={(e) => {
		//console.log(e);
	}}
>
	<slot name="before" />
	{#each $images as image, page}
		<div data-page={page} use:mount>
			<img on:drag|preventDefault src={image} alt={image} data-page={page} />
		</div>
	{/each}
	<slot name="after" />
</div>

<slot name="bottom" />

<style lang="scss">
	.wide-strip {
		display: flex;
		flex-direction: row;
		div {
			display: flex;
			width: 100%;
			height: 100%;
		}
	}
	.wide-strip.rtl {
		flex-direction: row-reverse;
	}
	.wide-strip.innerOverflow {
		overflow-x: scroll;
		width: 100%;
		height: calc(100cqh - var(--to-remove-height));
	}
	img {
		height: 100%;
	}
</style>
