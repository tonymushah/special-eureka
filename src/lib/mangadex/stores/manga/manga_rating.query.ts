import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription mangaRatingSubscription($id: UUID!) {
		watchRating(mangaId: $id) {
			rating
		}
	}
`);

export const query = graphql(`
	query getMangaRating($id: UUID!) {
		rating {
			lists(mangaIds: [$id]) {
				rating
			}
		}
	}
`);

export const updateCreateMutation = graphql(`
	mutation updateMangaRating($id: UUID!, $rating: Int!) {
		rating {
			createUpdate(params: { mangaId: $id, rating: $rating })
		}
	}
`);

export const deleteMutation = graphql(`
	mutation deleteMangaRating($id: UUID!) {
		rating {
			delete(id: $id)
		}
	}
`);
