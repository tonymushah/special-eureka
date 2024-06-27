<script lang="ts">
	import { derived, writable, type Readable } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { currentChapterPage } from "../../stores/currentPage";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";
	import { onMount } from "svelte";
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
	onMount(() =>
		currentChapter.subscribe(([page, fromInter]) => {
			if (!shouldIgnore && !fromInter) {
				if (widestrip_root != undefined) {
					const current = widestrip_root.querySelector(`div[data-page=\"${page}\"]`);
					if (current != null) {
						current.scrollIntoView();
					}
				}
			}
		})
	);
	export let innerOverflow = true;
	$: rtl = $readingDirection == ReadingDirection.Rtl;
	// TODO Add support with the intersection observer API
	const interObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const page = entry.target.getAttribute("data-page");
				if (page != null) {
					if (entry.isIntersecting && entry.intersectionRatio > 0) {
						fromIntersector(() => {
							currentChapterPage.set(Number(page));
						});
					}
				}
			});
		},
		{
			root: widestrip_root
		}
	);
</script>

<slot name="top" />

<div class="wide-strip" class:rtl class:innerOverflow bind:this={widestrip_root}>
	<slot name="before" />
	{#each $images as image, page}
		<div data-page={page}>
			<img
				on:load={(e) => {
					interObserver.observe(e.currentTarget);
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
