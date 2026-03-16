import { graphql } from "@mangadex/gql/gql";

export const listBlackListedScanlationGroupsGQLDoc = graphql(`
	query listBlacklistedScanlationGroups($params: BlacklistScanlationGroupsListParam) {
		blacklist {
			scanlationGroups {
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

export const getScanlationGroupBlacklistedByIdsGQLDoc = graphql(`
	query getScanlationGroupBlacklistedByIds($ids: [UUID!]!) {
		blacklist {
			scanlationGroups {
				getByIds(ids: $ids) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const getScanlationGroupBlacklistedByIdGQLDoc = graphql(`
	query getScanlationGroupBlacklistedById($id: UUID!) {
		blacklist {
			scanlationGroups {
				get(id: $id) {
					id
					name
					insertDate
				}
			}
		}
	}
`);

export const blockScanlationGroupGQLDoc = graphql(`
	mutation blockScanlationGroup($id: UUID!) {
		blacklist {
			scanlationGroups {
				blockOne(scanlationGroupId: $id) {
					id
				}
			}
		}
	}
`);

export const blockBatchScanlationGroupGQLDoc = graphql(`
	mutation blockBatchScanlationGroup($ids: [UUID!]!) {
		blacklist {
			scanlationGroups {
				blockMany(scanlationGroupIds: $ids) {
					id
				}
			}
		}
	}
`);

export const unblockScanlationGroupGQLDoc = graphql(`
	mutation unblockScanlationGroup($id: UUID!) {
		blacklist {
			scanlationGroups {
				unblockOne(scanlationGroupId: $id) {
					id
				}
			}
		}
	}
`);

export const unblockBatchScanlationGroupGQLDoc = graphql(`
	mutation unblockBatchScanlationGroup($ids: [UUID!]!) {
		blacklist {
			scanlationGroups {
				unblockMany(scanlationGroupIds: $ids) {
					id
				}
			}
		}
	}
`);
