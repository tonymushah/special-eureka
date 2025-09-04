import type { LayoutLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";
import query from "@mangadex/gql-docs/chapter/layout";

// TODO add data-saver support
export const load: LayoutLoad = async ({ params, url }) => {
	const startPage = url.searchParams.get("startPage");
	const isEnd = startPage == "end";

	const { id } = params;
	const client = await getClient();
	const result = await client
		.query(query, {
			id
		})
		.toPromise();
	if (result.data != undefined) {
		const pagesL = result.data.chapter.get.attributes.pages;
		const data = result.data.chapter.get;
		const currentPage = isEnd ? pagesL - 1 : Math.abs(Number(startPage));
		return {
			data,
			currentPage: isNaN(currentPage) ? 0 : currentPage
		};
	} else if (result.error != undefined) {
		error(500, {
			message: result.error.message
		});
	} else {
		error(400, {
			message: "Chapter Not found"
		});
	}
};
