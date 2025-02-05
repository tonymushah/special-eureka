<script lang="ts" module>
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
	import { TitleKey } from "./Info.utils";
	import { goto } from "$app/navigation";
	import { route, routes } from "$lib/ROUTES";

	interface Props {
		authors?: SimpleItems[];
		artists?: SimpleItems[];
		genres?: SimpleItems[];
		themes?: SimpleItems[];
		demographic?: SimpleItems[];
		format?: SimpleItems[];
		content?: SimpleItems[];
		links?: MangaLinks | undefined;
		altTitles?: AltTitleItem[];
		children?: import("svelte").Snippet;
	}

	let {
		authors = [],
		artists = [],
		genres = [],
		themes = [],
		demographic = [],
		format = [],
		content = [],
		links = undefined,
		altTitles = $bindable([]),
		children
	}: Props = $props();

	let tBButtons = $derived([
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
			title: genres.length > 1 ? "Genres" : "Genre",
			items: genres
		},
		{
			key: TitleKey.Themes,
			title: themes.length > 1 ? "Themes" : "Theme",
			items: themes
		},
		{
			key: TitleKey.Demographic,
			title: demographic.length > 1 ? "Demographics" : "Demographic",
			items: demographic
		},
		{
			key: TitleKey.Format,
			title: format.length > 1 ? "Formats" : "Format",
			items: format
		},
		{
			key: TitleKey.Content,
			title: content.length > 1 ? "Contents" : "Content",
			items: content
		}
	]);
	let toUseLinks = $derived(propsToUseLink(links ?? { hasNoLinks: true }));
</script>

<MangaPageChaptersInfo
	bind:altTitles
	idsKeysItem={tBButtons}
	links={toUseLinks}
	on:titlePButton={({ detail }) => {
		const { key, id } = detail;
		switch (key) {
			case TitleKey.Author:
				goto(
					route("/mangadex/author/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Artist:
				goto(
					route("/mangadex/author/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Genres:
				goto(
					route("/mangadex/tag/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Themes:
				goto(
					route("/mangadex/tag/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Demographic:
				goto(
					route("/mangadex/tag/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Format:
				goto(
					route("/mangadex/tag/[id]", {
						id: id
					})
				);
				break;
			case TitleKey.Content:
				goto(
					route("/mangadex/tag/[id]", {
						id: id
					})
				);
				break;
			default:
				break;
		}
	}}
>
	{@render children?.()}
</MangaPageChaptersInfo>
