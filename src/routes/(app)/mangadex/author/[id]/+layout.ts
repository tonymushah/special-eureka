import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params }) => {
	const id = params.id;
	return {
		id
	};
};
