import { graphql } from "@mangadex/gql/gql";

export const onlyScanlationGroupNameGQLDoc = graphql(`
	query onlyScanlationGroupName($scanGroupsId: [UUID!]!) {
		scanlationGroup {
			list(params: { groupIds: $scanGroupsId }) {
				data {
					id
					attributes {
						name
					}
				}
			}
		}
	}
`);
