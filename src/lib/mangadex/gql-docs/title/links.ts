import { graphql } from "@mangadex/gql/gql";

export const MangaLinksFrag = graphql(`
	fragment MangaLinksFrag on MangaLinks {
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
`);