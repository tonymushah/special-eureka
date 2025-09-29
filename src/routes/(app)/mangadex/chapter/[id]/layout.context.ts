import type { Client } from "@urql/svelte";
import query from "@mangadex/gql-docs/chapter/layout";
import getTitleConflicts from "@mangadex/utils/conflicts";

export async function load({
	id,
	client,
	isEnd,
	startPage
}: {
	id: string,
	client: Client,
	isEnd?: boolean,
	startPage?: number
}) {
	const result = await client
		.query(query, {
			id
		})
		.toPromise();
	if (result.data != undefined) {
		const pagesL = result.data.chapter.get.attributes.pages;
		const data = result.data.chapter.get;
		const currentPage = isEnd ? pagesL - 1 : Math.abs(Number(startPage));

		const title = data.relationships.manga;
		const conflicts = await getTitleConflicts({ client, title, id });

		return {
			data,
			currentPage: isNaN(currentPage) ? 0 : currentPage,
			conflicts
		};
	} else if (result.error != undefined) {
		throw result.error
	} else {
		throw new Error("Title not found");
	}
}

export type LayoutData = Awaited<ReturnType<typeof load>>