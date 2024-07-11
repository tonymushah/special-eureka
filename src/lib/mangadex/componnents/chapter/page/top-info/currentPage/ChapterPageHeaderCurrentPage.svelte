<script lang="ts" context="module">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { isArray } from "lodash";
	import { derived, readable } from "svelte/store";
	import { getCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import { getChapterImageContext } from "../../contexts/images";
	import getChapterDoublePageCurrentPage from "../../readinMode/doublePage/utils/getChapterDoublePageCurrentPage";

	function getCurrentPageIndex() {
		try {
			const readingMode = getCurrentChapterReadingMode();
			const currentPage = getChapterCurrentPageContext();
			const currentPageDouble = getChapterDoublePageCurrentPage(currentPage);
			return derived(
				[readingMode, currentPage, currentPageDouble],
				([$mode, $currentPage, $currentPageDouble]) => {
					if ($mode == ReadingMode.DoublePage) {
						if (isArray($currentPageDouble)) {
							return `${$currentPageDouble[0]} - ${$currentPageDouble[1]}`;
						} else {
							return `${$currentPageDouble}`;
						}
					} else {
						return `${$currentPage}`;
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
				return `${$is.length + 1}`;
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
		display: content;
	}
</style>
