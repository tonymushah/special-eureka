<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import {
		ArrowLeftIcon,
		ArrowUpIcon,
		ArrowRightIcon,
		ArrowDownIcon
	} from "svelte-feather-icons";
	import { Direction as ReadingDirection, ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import { resetZoom } from "@mangadex/componnents/chapter/page/contexts/resetZoomEventTarget";
	import getCurrentChapterImages from "@mangadex/componnents/chapter/page/utils/getCurrentChapterImages";
	import { getCurrentChapterReadingMode } from "@mangadex/componnents/chapter/page/contexts/currentChapterReadingMode";

	interface Events {
		onnext?: () => any;
		onprevious?: () => any;
	}

	interface Props extends Events {
		children?: import("svelte").Snippet;
	}

	let { children, onnext, onprevious }: Props = $props();

	const direction = getCurrentChapterDirection();
	const readingMode = getCurrentChapterReadingMode();
	const currentChapterPage = getChapterCurrentPageContext();
	const images_context = getCurrentChapterImages();
	let next = $derived(function () {
		if ($images_context.pagesLen) {
			if ($currentChapterPage < $images_context.pagesLen - 1) {
				resetZoom();
				$currentChapterPage++;
			} else {
				onnext?.();
			}
		}
	});
	let previous = $derived(function () {
		if ($images_context.pagesLen) {
			if ($currentChapterPage > 0) {
				resetZoom();
				$currentChapterPage--;
			} else {
				onprevious?.();
			}
		}
	});
	let onNext = $derived(function () {
		switch ($direction) {
			case ReadingDirection.Ltr:
				next();
				break;
			case ReadingDirection.Rtl:
				previous();
				break;
			default:
				break;
		}
	});
	let onPrevious = $derived(function () {
		switch ($direction) {
			case ReadingDirection.Ltr:
				previous();
				break;
			case ReadingDirection.Rtl:
				next();
				break;
			default:
				break;
		}
	});
	const variant = "2";
	let isLongstrip = $derived($readingMode == ReadingMode.LongStrip);
</script>

<ButtonAccent {variant} onclick={onPrevious} disabled={$images_context.pagesLen == undefined}>
	{#if isLongstrip}
		<ArrowUpIcon />
	{:else}
		<ArrowLeftIcon />
	{/if}
</ButtonAccent>

{@render children?.()}

<ButtonAccent {variant} onclick={onNext} disabled={$images_context.pagesLen == undefined}>
	{#if isLongstrip}
		<ArrowDownIcon />
	{:else}
		<ArrowRightIcon />
	{/if}
</ButtonAccent>
