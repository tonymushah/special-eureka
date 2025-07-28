import getClient from "@mangadex/gql/urql/getClient";
import type { LayoutLoad } from "./$types";
import customListPageQuery from "@mangadex/componnents/custom-list/page/query";

export const load: LayoutLoad = async (load_params) => {
	const id = load_params.params.id;
	const client = await getClient();
	const real_id = id.replace("private:", "");
	const _private = id.startsWith("private:");
	const res = await client
		.query(customListPageQuery, { id: real_id, private: _private })
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.customList.get;
	} else {
		throw new Error("unreachable...");
	}
};
