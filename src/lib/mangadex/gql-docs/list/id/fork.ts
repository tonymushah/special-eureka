import { graphql } from "@mangadex/gql/gql";
import type { CustomListVisibility, InputMaybe } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const forkMGQLMutation = graphql(`
	mutation forkCustomList(
		$name: String!
		$visibility: CustomListVisibility
		$toFork: UUID!
		$filter: Boolean
	) {
		customList {
			fork(filterContent: $filter, name: $name, visibility: $visibility, toFork: $toFork) {
				id
				attributes {
					name
					visibility
				}
				relationships {
					titlesIds
				}
			}
		}
	}
`);

type ForkCustomListMutationVariables = {
	toFork: string;
	visibility: InputMaybe<CustomListVisibility>;
	filter: InputMaybe<boolean>;
	name: string;
};

export const forkCustomListMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["customList", "fork"],
			async mutationFn({ toFork, visibility, filter, name }: ForkCustomListMutationVariables) {
				const res = await client
					.mutation(forkMGQLMutation, {
						toFork,
						visibility,
						filter,
						name
					})
					.toPromise();
				if (res.data) {
					const data = res.data.customList.fork;
					return {
						id: data.id,
						name: data.attributes.name,
						visibility: data.attributes.visibility,
						titlesIDs: data.relationships.titlesIds
					};
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no data??");
				}
			}
		}),
		() => mangadexQueryClient
	);
