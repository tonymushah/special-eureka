<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import { getChapterImageContext } from "@mangadex/componnents/chapter/page/contexts/images";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "@mangadex/componnents/chapter/page/contexts/previousNextEventTarget";

	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import { resetZoom } from "@mangadex/componnents/chapter/page/contexts/resetZoomEventTarget";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const direction = getCurrentChapterDirection();

	const currentChapterPage = getChapterCurrentPageContext();
	const images_context = getChapterImageContext();
	let next = $derived(function () {
		if ($currentChapterPage < $images_context.length - 1) {
			resetZoom();
			$currentChapterPage++;
		} else {
			fireChapterNextEvent();
		}
	});
	let previous = $derived(function () {
		if ($currentChapterPage > 0) {
			resetZoom();
			$currentChapterPage--;
		} else {
			fireChapterPreviousEvent();
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
</script>

<ButtonAccent {variant} on:click={onPrevious}>
	<ArrowLeftIcon />
</ButtonAccent>

{@render children?.()}

<ButtonAccent {variant} on:click={onNext}>
	<ArrowRightIcon />
</ButtonAccent>
