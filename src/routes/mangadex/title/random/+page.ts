import { graphql } from "@mangadex/gql";
import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { route } from "$lib/ROUTES";
import getClient from "@mangadex/gql/urql/getClient";


const query = graphql(`
	query randomTitle($options: MangaRandomParams) {
		manga {
			random(params: $options) {
				id
			}
		}
	}
`);

export const load: PageLoad = async function () {
	const client = getClient();

	redirect(300, route("/mangadex/title/[id]", {

	}));
}