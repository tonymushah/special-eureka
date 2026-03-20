import { graphql } from "@mangadex/gql/gql";

export const listBlackListedUsersGQLDoc = graphql(`
	query listBlacklistedUsers($params: BlacklistUserListParam) {
		blacklist {
			users {
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

export const getUserBlacklistedByIdsGQLDoc = graphql(`
	query getUserBlacklistedByIds($ids: [UUID!]!) {
		blacklist {
			users {
				getByIds(ids: $ids) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const getUserBlacklistedByIdGQLDoc = graphql(`
	query getUserBlacklistedById($id: UUID!) {
		blacklist {
			users {
				get(id: $id) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const blockUserGQLDoc = graphql(`
	mutation blockUser($id: UUID!) {
		blacklist {
			users {
				blockOne(userId: $id) {
					id
				}
			}
		}
	}
`);

export const blockBatchUserGQLDoc = graphql(`
	mutation blockBatchUser($ids: [UUID!]!) {
		blacklist {
			users {
				blockMany(userIds: $ids) {
					id
				}
			}
		}
	}
`);

export const unblockUserGQLDoc = graphql(`
	mutation unblockUsers($id: UUID!) {
		blacklist {
			users {
				unblockOne(userId: $id) {
					id
				}
			}
		}
	}
`);

export const unblockBatchUserGQLDoc = graphql(`
	mutation unblockBatchUser($ids: [UUID!]!) {
		blacklist {
			users {
				unblockMany(userIds: $ids) {
					id
				}
			}
		}
	}
`);
