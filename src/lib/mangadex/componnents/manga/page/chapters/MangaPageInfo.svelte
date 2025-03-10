<script lang="ts">
	import type { AltTitleItem } from "@mangadex/componnents/manga/page/chapters/info/alt-titles/MangaAltTitles.svelte";
	import Info, { type SimpleItems } from "@mangadex/componnents/manga/page/chapters/Info.svelte";
	import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
	import getLanguageFromStr from "@mangadex/utils/lang/getLanguageFromStr";
	import { getContextClient } from "@urql/svelte";
	import { TagGroup, type MangaLinks, MangaStatus } from "@mangadex/gql/graphql";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import getDemographicName from "@mangadex/utils/demographic/getDemographicName";
	import LatestChapter from "@mangadex/componnents/manga/page/chapters/info/LatestChapter.svelte";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";

	const __res = getTitleLayoutData();
	const data = __res.queryResult;
	const client = getContextClient();
	function buildAtlTitles(altTitle: Record<string, string>[]): AltTitleItem[] {
		let map = manga_altTitle_to_lang_map(altTitle);
		let output: AltTitleItem[] = [];
		map.forEach((title, lang) => {
			output.push({
				title,
				locale: getLanguageFromStr({
					lang,
					client
				})
			});
		});
		return output;
	}
	function getGenres(d: typeof data): SimpleItems[] {
		let returns: SimpleItems[] = [];
		d?.attributes.tags.forEach((v) => {
			if (v.attributes.group == TagGroup.Genre) {
				returns.push({
					id: v.id,
					name:
						get_value_from_title_and_random_if_undefined(v.attributes.name, "en") ?? ""
				});
			}
		});
		return returns;
	}
	function getThemes(d: typeof data): SimpleItems[] {
		let returns: SimpleItems[] = [];
		d?.attributes.tags.forEach((v) => {
			if (v.attributes.group == TagGroup.Theme) {
				returns.push({
					id: v.id,
					name:
						get_value_from_title_and_random_if_undefined(v.attributes.name, "en") ?? ""
				});
			}
		});
		return returns;
	}
	function getDemographic(d: typeof data): SimpleItems[] {
		const demographic = d?.attributes.publicationDemographic;
		console.log(demographic);
		if (demographic != undefined || demographic != null) {
			return [
				{
					id: demographic,
					name: getDemographicName(demographic)
				}
			];
		} else {
			return [];
		}
	}
	function getFormat(d: typeof data): SimpleItems[] {
		let returns: SimpleItems[] = [];
		d?.attributes.tags.forEach((v) => {
			if (v.attributes.group == TagGroup.Format) {
				returns.push({
					id: v.id,
					name:
						get_value_from_title_and_random_if_undefined(v.attributes.name, "en") ?? ""
				});
			}
		});
		return returns;
	}
	function getContent(d: typeof data): SimpleItems[] {
		let returns: SimpleItems[] = [];
		d?.attributes.tags.forEach((v) => {
			if (v.attributes.group == TagGroup.Content) {
				returns.push({
					id: v.id,
					name:
						get_value_from_title_and_random_if_undefined(v.attributes.name, "en") ?? ""
				});
			}
		});
		return returns;
	}
	function getLinks(d: typeof data): MangaLinks | undefined {
		const links = d?.attributes.links;
		console.log(links);
		if (links == null) {
			return undefined;
		} else {
			return links;
		}
	}
	let altTitles = $derived(buildAtlTitles(data?.attributes.altTitles ?? []));

	let genres = $derived(getGenres(data));

	let themes = $derived(getThemes(data));

	let demographic = $derived(getDemographic(data));

	let format = $derived(getFormat(data));

	let content = $derived(getContent(data));

	let links = $derived(getLinks(data));

	let lastVolume = $derived(data?.attributes.lastVolume);

	let lastChapter = $derived(data?.attributes.lastChapter);
</script>

<Info
	{altTitles}
	authors={data?.relationships.authors.map((a) => ({
		id: a.id,
		name: a.attributes.name
	}))}
	artists={data?.relationships.artists.map((a) => ({
		id: a.id,
		name: a.attributes.name
	}))}
	{genres}
	{links}
	{themes}
	{demographic}
	{format}
	{content}
>
	<LatestChapter volume={lastVolume} chapter={lastChapter} />
</Info>
