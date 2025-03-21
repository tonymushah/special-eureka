import { graphql } from "@mangadex/gql/exports";

export type ResMapInnerInner = {
	id: string;
	filename: string;
};

export type ResMapInner = [string, ResMapInnerInner];

export const latest_updates_query = graphql(/* GraphQL */ `
	query recentlyAddedHome {
		home {
			recentlyUploaded {
				data {
					id
					attributes {
						title
						pages
						translatedLanguage
						readableAt
						chapter
						volume
					}
					relationships {
						scanlationGroups {
							id
							attributes {
								name
							}
						}
						user {
							id
							attributes {
								username
								roles
							}
						}
						manga {
							id
							attributes {
								title
							}
							relationships {
								coverArt {
									id
									attributes {
										fileName
									}
								}
							}
						}
					}
				}
			}
		}
	}
`);
