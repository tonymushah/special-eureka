<script lang="ts" module>
	import { Direction, ReadingMode } from "@mangadex/gql/graphql";
	import { isArray } from "lodash";
	import { getCurrentChapterReadingMode } from "../../contexts/currentChapterReadingMode";
	import { getChapterCurrentPageContext } from "../../contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "../../readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "../../readinMode/doublePage/utils/getChapterDoublePageIndexes";
	import { getCurrentChapterDirection } from "../../contexts/readingDirection";
	import getCurrentChapterImages from "../../utils/getCurrentChapterImages";
</script>

<script lang="ts">
	const images = getCurrentChapterImages();
	const readingMode = getCurrentChapterReadingMode();
	const currentPage = getChapterCurrentPageContext();
	const currentPageDouble = getChapterDoublePageCurrentPageIndex();
	const currentPageIndexes = getChapterDoublePageIndexes();
	const readingDirection = getCurrentChapterDirection();

	let index = $derived.by(() => {
		if ($readingMode == ReadingMode.DoublePage) {
			const currentPageDoubleIndex = currentPageIndexes.value[currentPageDouble.value];
			if (isArray(currentPageDoubleIndex)) {
				if ($readingDirection == Direction.Ltr) {
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
	});
	let length = $derived.by(() => {
		return images.pagesLen ?? "??";
	});
</script>

<div>
	{index} / {length}
</div>

<style lang="scss">
	div {
		display: contents;
	}
</style>
