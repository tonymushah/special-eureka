import { graphql } from "@mangadex/gql/gql";

export const createSessionMutationGQLDocs = graphql(`
	mutation createInternalSessionMutation($mangaId: UUID!, $groups: [UUID!]) {
		upload {
			internal {
				createSession(groups: $groups, mangaId: $mangaId)
			}
		}
	}
`);
