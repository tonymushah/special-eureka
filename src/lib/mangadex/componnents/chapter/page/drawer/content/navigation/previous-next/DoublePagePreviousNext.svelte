<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageIndexes";

	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import { resetZoom } from "@mangadex/componnents/chapter/page/contexts/resetZoomEventTarget";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { ceil, isArray, noop, random } from "lodash";
	import { onMount, type Snippet } from "svelte";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import { derived as der } from "svelte/store";
	import getCurrentChapterImages from "@mangadex/componnents/chapter/page/utils/getCurrentChapterImages";

	const chapterPages = getCurrentChapterImages();
	const direction = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();
	const currentPageIndex = getChapterDoublePageCurrentPageIndex();
	const images_indexes = getChapterDoublePageIndexes();
	const images_length = der(images_indexes, ($imgs) => $imgs.length);

	interface Events {
		onnext?: () => any;
		onprevious?: () => any;
	}

	interface Props extends Events {
		children?: Snippet;
	}

	let { onnext, onprevious, children }: Props = $props();
	let disabled = $derived($chapterPages.pagesLen == undefined);

	/// BUG or more like shit code xd
	/// Required or else the component may not work proprely
	onMount(() => images_indexes.subscribe(noop));
	// onMount(() => images.subscribe(noop));
	onMount(() => currentPageIndex.subscribe(noop));
	function next() {
		if (disabled) {
			return;
		}
		if ($currentPageIndex < $images_length - 1) {
			resetZoom();
			currentChapterPage.update((i) => {
				const index = $images_indexes[$currentPageIndex + 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else if (typeof index == "number" && !isNaN(index)) {
					return index;
				} else {
					return i;
				}
			});
		} else {
			onnext?.();
		}
	}
	function previous() {
		if (disabled) {
			return;
		}
		if ($currentPageIndex > 0) {
			resetZoom();
			currentChapterPage.update((i) => {
				const index = $images_indexes[$currentPageIndex - 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else if (typeof index == "number" && !isNaN(index)) {
					return index;
				} else {
					return i;
				}
			});
		} else {
			onprevious?.();
		}
	}
	function onNext() {
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
	}
	function onPrevious() {
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
	}
	const variant = "2";
</script>

<ButtonAccent {variant} onclick={onPrevious} {disabled}>
	<ArrowLeftIcon />
</ButtonAccent>

{@render children?.()}

<ButtonAccent {variant} onclick={onNext} {disabled}>
	<ArrowRightIcon />
</ButtonAccent>
