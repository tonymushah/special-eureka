import getClient from "@mangadex/gql/urql/getClient";
import type { PageLoad } from "./$types";
import { userMeOnSidebarFooterQuery } from "@mangadex/componnents/sidebar/footer";
import { redirect } from "@sveltejs/kit";
import { route } from "$lib/ROUTES";

export const load: PageLoad = async () => {
	const client = await getClient();
	const res = await client.query(userMeOnSidebarFooterQuery, {}).toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		redirect(300, route("/mangadex/user/[id]", {
			id: res.data.user.me.id
		}))
	} else {
		throw new Error("no data???");
	}
}