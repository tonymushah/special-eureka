<script lang="ts" context="module">
	export type SimpleItems = {
		id: string;
		name: string;
	};

	function amazonLink({ amazon }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (amazon) {
			return {
				title: "Amazon",
				href: amazon,
				icon: getFaviconSrc({ url: amazon, client })
			};
		}
	}
	function anilistLink({ anilist }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (anilist) {
			return {
				title: "AniList",
				href: anilist,
				icon: getFaviconSrc({ url: anilist, client })
			};
		}
	}
	function animePlanetLink({ animePlanet: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "Anime-Planet",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function bookWalkerLink({ bookWalker: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "Book☆Walker",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function cdJapanLink({ cdJapan: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "CDJapan",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function ebookJapanLink({ ebookJapan: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "eBookJapan",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function englishTranslationLink({ englishTranslation: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "Official English",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function kitsuLink({ kitsu: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "Kitsu",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function mangaUpdatesLink({ mangaUpdates: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "MangaUpdates",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function myAnimeListLink({ myAnimeList: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "myAnimeList",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function novelUpdatesLink({ novelUpdates: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "NovelUpdates",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function rawLink({ raw: url }: MangaLinks): LinkItem | undefined {
		const client = getContextClient();
		if (url) {
			return {
				title: "Official Raw",
				href: url,
				icon: getFaviconSrc({ url, client })
			};
		}
	}
	function propsToUseRawsLink(links: MangaLinks): LinkItem[] {
		let returns: LinkItem[] = [];
		const raw = rawLink(links);
		if (raw) {
			returns.push(raw);
		}
		const english = englishTranslationLink(links);
		if (english) {
			returns.push(english);
		}
		const amazon = amazonLink(links);
		if (amazon) {
			returns.push(amazon);
		}
		const bookWalker = bookWalkerLink(links);
		if (bookWalker) {
			returns.push(bookWalker);
		}
		const cdJapan = cdJapanLink(links);
		if (cdJapan) {
			returns.push(cdJapan);
		}
		const ebookJapan = ebookJapanLink(links);
		if (ebookJapan) {
			returns.push(ebookJapan);
		}
		return returns;
	}
	function propsToUseTrackLink(links: MangaLinks): LinkItem[] {
		let returns: LinkItem[] = [];
		const mangaUpdates = mangaUpdatesLink(links);
		if (mangaUpdates) {
			returns.push(mangaUpdates);
		}
		const animePlanet = animePlanetLink(links);
		if (animePlanet) {
			returns.push(animePlanet);
		}
		const anilist = anilistLink(links);
		if (anilist) {
			returns.push(anilist);
		}
		const kitsu = kitsuLink(links);
		if (kitsu) {
			returns.push(kitsu);
		}
		const myAnimeList = myAnimeListLink(links);
		if (myAnimeList) {
			returns.push(myAnimeList);
		}
		const novelUpdates = novelUpdatesLink(links);
		if (novelUpdates) {
			returns.push(novelUpdates);
		}
		return returns;
	}
	function propsToUseLink(links: MangaLinks): MangaLinksItem[] {
		console.log(links);
		if (links.hasNoLinks == false) {
			return [
				{
					title: "Read or Buy",
					items: propsToUseRawsLink(links)
				},
				{
					title: "Track",
					items: propsToUseTrackLink(links)
				}
			];
		} else {
			return [];
		}
	}
</script>

<script lang="ts">
	import { type MangaLinks } from "@mangadex/gql/graphql";
	import { getFaviconSrc } from "@mangadex/utils/favicons/getFaviconSrc";
	import { getContextClient } from "@urql/svelte";
	import MangaPageChaptersInfo, { type MangaLinksItem } from "./MangaPageChaptersInfo.svelte";
	import type { AltTitleItem } from "./info/alt-titles/MangaAltTitles.svelte";
	import type { LinkItem } from "./info/links/MangaLinksBase.svelte";
	enum TitleKey {
		Author,
		Artist,
		Genres,
		Themes,
		Demographic,
		Format
	}
	export let authors: SimpleItems[] = [];
	export let artists: SimpleItems[] = [];
	export let genres: SimpleItems[] = [];
	export let themes: SimpleItems[] = [];
	export let demographic: SimpleItems[] = [];
	export let format: SimpleItems[] = [];
	export let links: MangaLinks | undefined = undefined;
	export let altTitles: AltTitleItem[] = [];
	$: console.log(links);

	$: tBButtons = [
		{
			key: TitleKey.Author,
			title: authors.length > 1 ? "Authors" : "Author",
			items: authors
		},
		{
			key: TitleKey.Artist,
			title: artists.length > 1 ? "Artists" : "Artist",
			items: artists
		},
		{
			key: TitleKey.Genres,
			title: genres.length > 1 ? "Genres" : "Genres",
			items: genres
		},
		{
			key: TitleKey.Themes,
			title: themes.length > 1 ? "Themes" : "Theme",
			items: themes
		},
		{
			key: TitleKey.Demographic,
			title: demographic.length > 1 ? "Demographic" : "Demographics",
			items: demographic
		},
		{
			key: TitleKey.Format,
			title: format.length > 1 ? "Format" : "Formats",
			items: format
		}
	];
	$: toUseLinks = propsToUseLink(links ?? { hasNoLinks: true });
</script>

<MangaPageChaptersInfo bind:altTitles idsKeysItem={tBButtons} bind:links={toUseLinks} />
