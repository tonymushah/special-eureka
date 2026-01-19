import { graphql } from "@mangadex/gql";

export const hideReadTitlesSubscriptionGQL = graphql(`
	subscription watchOnlyUnreadSub {
		watchHideReadTitles
	}
`);

export const hideReadTitleMutationGQL = graphql(`
	mutation setHideReadTitle($hide: Boolean!) {
		userOption {
			setHideReadTitles(hide: $hide)
		}
	}
`);
