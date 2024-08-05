import { graphql } from "@mangadex/gql";
import type { LayoutLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";

export const ssr = false;

const query = graphql(`
	query getChapterPageData($id: UUID!) {
		chapter {
			pages(id: $id) {
				data
				dataSaver
			}
			get(id: $id) {
				id
				attributes {
					title
					volume
					chapter
					pages
					translatedLanguage
					externalUrl
					readableAt
				}
				relationships {
					manga {
						id
						attributes {
							title
						}
					}
					scanlationGroups {
						id
						attributes {
							name
						}
					}
					user {
						id
						attributes {
							username
							roles
						}
					}
				}
			}
		}
	}
`);

export const load: LayoutLoad = async ({ params, url }) => {
	const startPage = url.searchParams.get("startPage");
	const currentPage = Math.abs(Number(startPage));
	const { id } = params;
	const client = await getClient();
	const result = await client.query(query, {
		id
	});
	if (result.data != undefined) {
		const pages = result.data.chapter.pages;
		const data = result.data.chapter.get;
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
