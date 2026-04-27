import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription mangaFollowingStatusSubscription($id: UUID!) {
		watchIsFollowingManga(mangaId: $id)
	}
`);

export const query = graphql(`
	query mangaFollowingStatusQuery($id: UUID!) {
		follows {
			isFollowingManga(id: $id)
		}
	}
`);

export const followMutation = graphql(`
	mutation followMangaMutation($id: UUID!) {
		manga {
			follow(id: $id)
		}
	}
`);

export const unfollowMutation = graphql(`
	mutation unfollowMangaMutation($id: UUID!) {
		manga {
			unfollow(id: $id)
		}
	}
`);
