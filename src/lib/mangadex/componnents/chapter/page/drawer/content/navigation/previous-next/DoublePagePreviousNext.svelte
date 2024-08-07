<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageIndexes";
	import getChapterImagesAsDoublePage from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterImagesAsDoublePage";

	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ceil, isArray, random } from "lodash";
	import { createEventDispatcher } from "svelte";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import { resetZoom } from "@mangadex/componnents/chapter/page/contexts/resetZoomEventTarget";

	const direction = getCurrentChapterDirection();
	const currentChapterPage = getChapterCurrentPageContext();
	const currentPageIndex = getChapterDoublePageCurrentPageIndex();
	const images_indexes = getChapterDoublePageIndexes();
	const images = getChapterImagesAsDoublePage();
	const images_length = derived(images, ($imgs) => $imgs.length);
	const dispatch = createEventDispatcher<{
		next: {};
		previous: {};
	}>();
	$: next = function () {
		if ($currentPageIndex < $images_length - 1) {
			resetZoom();
			currentChapterPage.update(() => {
				const index = $images_indexes[$currentPageIndex + 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else {
					return index;
				}
			});
		} else {
			dispatch("next", {});
		}
	};
	$: previous = function () {
		if ($currentPageIndex > 0) {
			resetZoom();
			currentChapterPage.update(() => {
				const index = $images_indexes[$currentPageIndex - 1];
				if (isArray(index)) {
					return index[ceil(random(0, 1))];
				} else {
					return index;
				}
			});
		} else {
			dispatch("previous", {});
		}
	};
	$: onNext = function () {
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
	};
	$: onPrevious = function () {
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
	};
	const variant = "2";
</script>

<ButtonAccent {variant} on:click={onPrevious}>
	<ArrowLeftIcon />
</ButtonAccent>

<slot />

<ButtonAccent {variant} on:click={onNext}>
	<ArrowRightIcon />
</ButtonAccent>
