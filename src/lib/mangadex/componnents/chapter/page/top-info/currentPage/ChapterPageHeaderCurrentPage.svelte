<script lang="ts" context="module">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { isArray } from "lodash";
	import { derived, readable } from "svelte/store";
	import { getCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { getChapterImageContext } from "../../contexts/images";
	import getChapterDoublePageCurrentPageIndex from "../../readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "../../readinMode/doublePage/utils/getChapterDoublePageIndexes";

	function getCurrentPageIndex() {
		try {
			const readingMode = getCurrentChapterReadingMode();
			const currentPage = getChapterCurrentPageContext();
			const currentPageDouble = getChapterDoublePageCurrentPageIndex(currentPage);
			const currentPageIndexes = getChapterDoublePageIndexes();
			return derived(
				[readingMode, currentPage, currentPageDouble, currentPageIndexes],
				([$mode, $currentPage, $currentPageDouble, $indexes]) => {
					if ($mode == ReadingMode.DoublePage) {
						const currentPageDoubleIndex = $indexes[$currentPageDouble];
						if (isArray(currentPageDoubleIndex)) {
							return `${currentPageDoubleIndex[0] + 1} - ${currentPageDoubleIndex[1] + 1} `;
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
			const images = getChapterImageContext();
			return derived(images, ($is) => {
				return `${$is.length}`;
			});
		} catch (error) {
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
