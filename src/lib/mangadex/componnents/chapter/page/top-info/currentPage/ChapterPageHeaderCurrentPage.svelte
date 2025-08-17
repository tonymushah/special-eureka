<script lang="ts" module>
	import { Direction, ReadingMode } from "@mangadex/gql/graphql";
	import { isArray } from "lodash";
	import { derived, readable } from "svelte/store";
	import { getCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "../../readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "../../readinMode/doublePage/utils/getChapterDoublePageIndexes";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	function getCurrentPageIndex() {
		try {
			const readingMode = getCurrentChapterReadingMode();
			const currentPage = getChapterCurrentPageContext();
			const currentPageDouble = getChapterDoublePageCurrentPageIndex();
			const currentPageIndexes = getChapterDoublePageIndexes();
			const readingDirection = getCurrentChapterDirection();
			return derived(
				[readingMode, currentPage, currentPageDouble, currentPageIndexes, readingDirection],
				([$mode, $currentPage, $currentPageDouble, $indexes, $direction]) => {
					if ($mode == ReadingMode.DoublePage) {
						const currentPageDoubleIndex = $indexes[$currentPageDouble];
						if (isArray(currentPageDoubleIndex)) {
							if ($direction == Direction.Ltr) {
								return `${currentPageDoubleIndex[0] + 1} - ${currentPageDoubleIndex[1] + 1} `;
							} else {
								return `${currentPageDoubleIndex[1] + 1} - ${currentPageDoubleIndex[0] + 1} `;
							}
						} else {
							return `${currentPageDoubleIndex + 1}`;
						}
					} else {
						return `${$currentPage + 1}`;
					}
				}
			);
		} catch (error) {
			return readable("??");
		}
	}
	function getCurrentImagesLength() {
		try {
			const images = getCurrentChapterImages();
			return derived(images, ($is) => {
				return `${$is.pagesLen ?? "??"}`;
			});
		} catch (error) {
			addErrorToast("Error", error);
			return readable("??");
		}
	}
</script>

<script lang="ts">
	const index = getCurrentPageIndex();
	const length = getCurrentImagesLength();
</script>

<div>
	{$index} / {$length}
</div>

<style lang="scss">
	div {
		display: contents;
	}
</style>
