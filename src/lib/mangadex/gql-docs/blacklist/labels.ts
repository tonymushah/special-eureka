// TODO add unlink and remove labels mutation
// TODO add list labels for author_artists, users, scanlation_groups

import { graphql } from "@mangadex/gql/gql";

export const listBlacklistLabelsQueryGQLDocs = graphql(`
	query listBlacklistLabels($params: BlacklistLabelsListParam) {
		blacklist {
			labels {
				list(params: $params) {
					offset
					limit
					total
					data {
						id
						name
						createDate
						description
					}
				}
			}
		}
	}
`);

export const getBlacklistLabelGQLDocs = graphql(`
	query getBlacklistLabel($id: UUID!) {
		blacklist {
			labels {
				get(id: $id) {
					id
					name
					createDate
					description
				}
			}
		}
	}
`);

export const getBlacklistLabelsByIdsGQLDocs = graphql(`
	query getBlacklistLabelsByIds($ids: [UUID!]!) {
		blacklist {
			labels {
				getByIds(ids: $ids) {
					id
					name
					createDate
					description
				}
			}
		}
	}
`);

export const createBlacklistLabelMutationGQLDocs = graphql(`
	mutation createBlacklistLabel($param: CreateBlacklistLabelParam!) {
		blacklist {
			labels {
				createLabel(param: $param) {
					id
				}
			}
		}
	}
`);

export const linkBlacklistLabelsAuthorsArtistsMutationGQLDocs = graphql(`
	mutation linkBlacklistLabelsAuthorsArtists(
		$labelIds: [UUID!]!
		$authorIds: [UUID!]!
		$notes: String
	) {
		blacklist {
			labels {
				linkAuthorsArtists(authorIds: $authorIds, labelIds: $labelIds, notes: $notes)
			}
		}
	}
`);

export const linkBlacklistLabelsScanlationGroupsMutationGQLDocs = graphql(`
	mutation linkBlacklistLabelsScanlationGroups(
		$scanlationGroupIds: [UUID!]!
		$labelIds: [UUID!]!
		$notes: String
	) {
		blacklist {
			labels {
				linkScanlationGroups(
					labelIds: $labelIds
					scanlationGroupsIds: $scanlationGroupIds
					notes: $notes
				)
			}
		}
	}
`);

export const linkBlacklistLabelsUsersMutationGQLDocs = graphql(`
	mutation linkBlacklistLabelsUsers($labelIds: [UUID!]!, $userIds: [UUID!]!, $notes: String) {
		blacklist {
			labels {
				linkUsers(labelIds: $labelIds, userIds: $userIds, notes: $notes)
			}
		}
	}
`);

export const deleteBlacklistLabelMutationGQLDocs = graphql(`
	mutation deleteBlacklistLabel($ids: [UUID!]!) {
		blacklist {
			labels {
				deleteLabels(labelIds: $ids) {
					name
				}
			}
		}
	}
`);

export const unlinkBlacklistLabelsAuthorsArtistsMutationGQLDocs = graphql(`
	mutation unlinkBlacklistLabelsAuthorsArtists($labelIds: [UUID!]!, $authorIds: [UUID!]!) {
		blacklist {
			labels {
				unlinkAuthorsArtists(authorIds: $authorIds, labelIds: $labelIds)
			}
		}
	}
`);

export const unlinkBlacklistLabelsScanlationGroupsMutationGQLDocs = graphql(`
	mutation unlinkBlacklistLabelsScanlationGroups(
		$scanlationGroupIds: [UUID!]!
		$labelIds: [UUID!]!
	) {
		blacklist {
			labels {
				unlinkScanlationGroups(
					labelIds: $labelIds
					scanlationGroupsIds: $scanlationGroupIds
				)
			}
		}
	}
`);

export const unlinkBlacklistLabelsUsersMutationGQLDocs = graphql(`
	mutation unlinkBlacklistLabelsUsers($labelIds: [UUID!]!, $userIds: [UUID!]!) {
		blacklist {
			labels {
				unlinkUsers(labelIds: $labelIds, userIds: $userIds)
			}
		}
	}
`);
