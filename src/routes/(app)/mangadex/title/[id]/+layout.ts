import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function ({ params }) {
	console.log("load title");

	const { id } = params;
	if (id != null) {
		return {
			id
		};
	} else {
		error(404, {
			message: "Title not found"
		});
	}
};
