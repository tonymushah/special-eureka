import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, url }) => {
	const startPage = url.searchParams.get("startPage");
	const isEnd = startPage == "end";

	const { id } = params;
	return {
		id,
		isEnd,
		startPage: isEnd ? undefined : Math.abs(Number(startPage))
	}
};

