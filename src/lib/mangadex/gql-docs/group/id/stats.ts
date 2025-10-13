import { graphql } from "@mangadex/gql/gql";

export const groupStatisticsQuery = graphql(`
	query groupStatisticsQuery($id: UUID!) {
		statistics {
			group{
				get(id: $id) {
					comments {
						threadId
						repliesCount
						threadUrl
					}
				}
			}
		}
	}
`);