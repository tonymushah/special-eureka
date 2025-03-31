import { graphql } from "@mangadex/gql";
import type { PageLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
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
	const client = await getClient();
	const res = await client.query(query, {

	}).toPromise();
	if (res.data?.manga.random.id) {
		redirect(300, route("/mangadex/title/[id]", {
			id: res.data.manga.random.id
		}));
	} else if (res.error) {
		error(500, {
			message: res.error.message
		})
	} else {
		error(500, {
			message: "Cannot get result..."
		})
	}

}