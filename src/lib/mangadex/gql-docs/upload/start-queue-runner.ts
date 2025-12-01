import { graphql } from "@mangadex/gql/gql";

export const startQueueRunnerGQLDocs = graphql(`
	mutation startInternalQueueRunner {
		upload {
			internal {
				startQueueRunner
			}
		}
	}
`);
