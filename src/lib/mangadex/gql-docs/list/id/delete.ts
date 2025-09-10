import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export const deleteCustomListGQLMutation = graphql(`
	mutation deleteCustomListMutation($id: UUID!) {
		customList{
			delete(id: $id)
		}
	}
`);


const deleteCustomListMutation = createMutation({
	mutationKey: ["custom-list", "delete"],
	async mutationFn(id: string) {
		const res = await client.mutation(deleteCustomListGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}, mangadexQueryClient);

export default deleteCustomListMutation;
