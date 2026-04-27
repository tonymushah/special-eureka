import type { ReadonlyValue } from "$lib";
import { isArray } from "lodash";
import { fromStore, readonly } from "svelte/store";
import { getChapterCurrentPageContext } from "../../../contexts/currentPage";
import getChapterDoublePageIndexes from "./getChapterDoublePageIndexes";

export default function getChapterDoublePageCurrentPageIndex(): ReadonlyValue<number> {
	const doublePages = getChapterDoublePageIndexes();
	const currentPage = fromStore(readonly(getChapterCurrentPageContext()));
	return {
		get value() {
			return doublePages.value.findIndex((image) => {
				if (isArray(image)) {
					return image.includes(currentPage.current);
				} else {
					return image == currentPage.current;
				}
			});
		}
	};
}
