<!--
    TODO Add drag support for scrolling
-->
<script lang="ts">
	import { derived, get, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { currentChapterPage } from "../../stores/currentPage";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { onMount } from "svelte";
	import { delay } from "lodash";
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
			}, 10);
		})
	);
</script>

<slot name="top" />

<div
	role="document"
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
		<div data-page={page}>
			<img
				data-initial-loading="true"
				on:drag|preventDefault
				on:load={(e) => {
					toObserve = [...toObserve, e.currentTarget];
				}}
				src={image}
				alt={image}
				data-page={page}
			/>
		</div>
	{/each}
	<slot name="after" />
</div>

<slot name="bottom" />

<style lang="scss">
	.wide-strip {
		display: flex;
		flex-direction: row;
	}
	.wide-strip.rtl {
		flex-direction: row-reverse;
	}
	.wide-strip.innerOverflow {
		overflow-x: scroll;
	}
	img {
		max-height: 100%;
	}
</style>
