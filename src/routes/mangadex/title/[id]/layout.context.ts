import { getContext, setContext } from "svelte";
import type { LayoutData } from "./$types";

const contextKey = "title-layout-data";

export function getTitleLayoutData(): LayoutData {
	return getContext(contextKey);
}
export function setTitleLayoutData(data: LayoutData) {
	setContext(contextKey, data);
}
