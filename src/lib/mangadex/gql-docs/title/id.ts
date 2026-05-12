import { graphql } from "@mangadex/gql/exports";

const query = graphql(/* GraphQL */ `
	query getMangaHihi($id: UUID!) {
		manga {
			get(id: $id) {
				id
				attributes {
					title
					altTitles
					state
					status
					description
					availableTranslatedLanguages
					year
					contentRating
					publicationDemographic
					lastVolume
					lastChapter
					latestUploadedChapter
					availableTranslatedLanguages
					originalLanguage
					links {
						...MangaLinksFrag
					}
					tags {
						id
						attributes {
							name
							group
						}
					}
				}
				relationships {
					authorArtists {
						id
						attributes {
							name
						}
						isBlocked
					}
					authors {
						id
						attributes {
							name
						}
					}
					artists {
						id
						attributes {
							name
						}
					}
					coverArt {
						id
						attributes {
							fileName
							locale
						}
					}
					manga {
						id
						related
					}
				}
			}
		}
	}
`);

export default query;