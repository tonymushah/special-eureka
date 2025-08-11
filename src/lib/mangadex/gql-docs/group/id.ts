import { graphql } from "@mangadex/gql";

const query = graphql(`
	query groupPageQuery($id: UUID!) {
		scanlationGroup {
			getUnique(id: $id) {
				id
				attributes {
					website
					twitter
					name
					altNames
					ircServer
					ircChannel
					contactEmail
					mangaUpdates
					focusedLanguages
					locked
					official
					verified
					exLicensed
					publishDelay
					createdAt
					description
					discord
				}
				relationships {
					leader {
						id
						attributes {
							roles
							username
						}
					}
					members {
						id
						attributes {
							roles
							username
						}
					}
				}
			}
		}
		manga {
			list(params: { group: $id }) {
				total
			}
		}
		statistics {
			group {
				get(id: $id) {
					comments {
						threadUrl
						repliesCount
					}
				}
			}
		}
		chapter {
			list(params: { groups: [$id] }) {
				total
			}
		}
	}
`);

export default query;