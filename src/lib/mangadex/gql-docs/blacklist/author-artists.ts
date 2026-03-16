import { graphql } from "@mangadex/gql/gql";

export const listBlackListedAuthorArtistsGQLDoc = graphql(`
	query listBlacklistedAuthorArtists($params: BlacklistAuthorsArtistsListParam) {
		blacklist {
			authorsArtists {
				list(params: $params) {
					limit
					total
					offset
					data {
						id
						name
						insertDate
					}
				}
			}
		}
	}
`);

export const getAuthorArtistsBlacklistedByIdsGQLDoc = graphql(`
	query getAuthorArtistsBlacklistedByIds($ids: [UUID!]!) {
		blacklist {
			authorsArtists {
				getByIds(ids: $ids) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const getAuthorArtistsBlacklistedByIdGQLDoc = graphql(`
	query getAuthorArtistsBlacklistedById($id: UUID!) {
		blacklist {
			authorsArtists {
				get(id: $id) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const blockAuthorArtistGQLDoc = graphql(`
	mutation blockAuthorArtistGQLDoc($id: UUID!) {
		blacklist {
			authorArtists {
				blockOne(authorId: $id) {
					id
				}
			}
		}
	}
`);

export const blockBatchAuthorArtistGQLDoc = graphql(`
	mutation blockBatchAuthorArtistGQLDoc($ids: [UUID!]!) {
		blacklist {
			authorArtists {
				blockMany(authorIds: $ids) {
					id
				}
			}
		}
	}
`);

export const unblockAuthorArtistGQLDoc = graphql(`
	mutation unblockAuthorArtistGQLDoc($id: UUID!) {
		blacklist {
			authorArtists {
				unblockOne(authorId: $id) {
					id
				}
			}
		}
	}
`);

export const unblockBatchAuthorArtistGQLDoc = graphql(`
	mutation unblockBatchAuthorArtistGQLDoc($ids: [UUID!]!) {
		blacklist {
			authorArtists {
				unblockMany(authorIds: $ids) {
					id
				}
			}
		}
	}
`);
