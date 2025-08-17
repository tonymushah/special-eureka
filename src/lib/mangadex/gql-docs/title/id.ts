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
						hasNoLinks
						amazon
						anilist
						animePlanet
						bookWalker
						cdJapan
						ebookJapan
						englishTranslation
						kitsu
						mangaUpdates
						myAnimeList
						novelUpdates
						raw
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