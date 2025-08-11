import { graphql } from "@mangadex/gql/exports";
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
	const result = await client.query(
		query,
		{
			id
		}
	).toPromise();
	console.log("Invoked layout data");
	if (result.data != undefined) {
		const pages = result.data.chapter.pages;
		const pagesL = pages.data.length;
		const data = result.data.chapter.get;
		const currentPage = isEnd ? pagesL - 1 : Math.abs(Number(startPage));
		return {
			data,
			pages,
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
