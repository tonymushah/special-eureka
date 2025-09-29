import { graphql } from "@mangadex/gql/gql";
import type { CustomListVisibility } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const getListVersionMutation = graphql(`
	query getCustomListVersion1($id: UUID!) {
		customList {
			get(id: $id, private: true) {
				id
				attributes {
					version
				}
			}
		}
	}
`);

const updateVisibility = graphql(`
	mutation updateCustomListVisibility1(
		$id: UUID!
		$visibility: CustomListVisibility!
		$version: Int!
	) {
		customList {
			update(params: { listId: $id, version: $version, visibility: $visibility }) {
				id
			}
		}
	}
`);

const updateCustomListVisibilityMutation = createMutation(
	{
		mutationKey: ["custom-list", "update", "visibilty"],
		async mutationFn({ id, visibility }: { id: string; visibility: CustomListVisibility }) {
			const res_ver = await client
				.query(getListVersionMutation, {
					id
				})
				.toPromise();
			if (res_ver.error) {
				throw res_ver.error;
			} else if (res_ver.data == null) {
				throw new Error(`Cannot fetch ${id} custom-list version`);
			}
			const res = await client
				.mutation(updateVisibility, {
					id,
					visibility,
					version: res_ver.data.customList.get.attributes.version + 1
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			}
		}
	},
	mangadexQueryClient
);

export default updateCustomListVisibilityMutation;
