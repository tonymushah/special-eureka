import query from "@mangadex/gql-docs/user/id";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function ({ params }) {
	const { id } = params;
	const client = await getClient();
	const res = await client
		.query(query, {
			id
		})
		.toPromise();
	if (res.error) {
		error(500, {
			message: res.error.message
		});
	}
	if (res.data) {
		const data = res.data;
		return {
			id,
			username: data.user.get.attributes.username,
			roles: data.user.get.attributes.roles,
			uploads: data.chapter.list.total,
			groups: data.user.get.relationships.groups.map((group) => ({
				id: group.id,
				name: group.attributes.name,
				isLeader: group.relationships.leader?.id == id
			}))
		};
	}
	error(500, {
		message: "No data??"
	});
};
