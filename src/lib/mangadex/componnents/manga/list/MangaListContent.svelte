<script lang="ts" module>
	import type { CoverMangaListItemProps } from "./cover/CoverMangaList.svelte";
	import type { LongMangaListItemProps } from "./long/LongMangaList.svelte";
	import type { MediumMangaListElementProps } from "./medium/MediumMangaList.svelte";

	export type MangaListContentItemProps = LongMangaListItemProps &
		CoverMangaListItemProps &
		MediumMangaListElementProps & {
			publicationDemographic?: Demographic;
		};
</script>

<script lang="ts">
	import ChapterFeedSelecto from "@mangadex/componnents/selecto/ChapterFeedSelecto.svelte";
	import { Demographic, MangaListStyle } from "@mangadex/gql/graphql";
	import { getMangaListStyleContext } from "./contexts/style";
	import CoverMangaList from "./cover/CoverMangaList.svelte";
	import LongMangaList from "./long/LongMangaList.svelte";
	import MediumMangaList from "./medium/MediumMangaList.svelte";
	import contentProfileWarningMode from "@mangadex/stores/contentProfileWarningMode";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { titleStatusMapQuery as titleStatusMapQueryLoader } from "@mangadex/gql-docs/library/isIn";
	import { isArray } from "lodash";
	import contentProfileBlur from "@mangadex/stores/contentProfileBlur";
	import { updateTitleBlur } from "@mangadex/utils/conflicts/mangaProps";

	interface Props {
		list?: MangaListContentItemProps[] | MangaListContentItemProps[][];
	}

	let { list: propsList }: Props = $props();
	let titleStatusMapQuery = titleStatusMapQueryLoader();
	let list = $derived.by(() => {
		if ($contentProfileBlur) {
			let toRet: Map<string, MangaListContentItemProps> = new Map();
			propsList?.map((maybe_obj) => {
				if (isArray(maybe_obj)) {
					maybe_obj.forEach((title) => {
						toRet.set(
							title.id,
							updateTitleBlur({
								title,
								warningMode: $contentProfileWarningMode,
								profile: $defaultContentProfile,
								library: titleStatusMapQuery.data ?? new Map()
							})
						);
					});
				} else {
					toRet.set(
						maybe_obj.id,
						updateTitleBlur({
							title: maybe_obj,
							warningMode: $contentProfileWarningMode,
							profile: $defaultContentProfile,
							library: titleStatusMapQuery.data ?? new Map()
						})
					);
				}
			});
			return toRet.values().toArray();
		} else {
			return propsList;
		}
	});
	const style = getMangaListStyleContext();
	let container: HTMLElement | undefined = $state();
	let selectedChapters: string[] = $state([]);
	let selectedMangas: string[] = $state([]);
</script>

<ChapterFeedSelecto bind:container bind:selectedChapters bind:selectedMangas />

<div class="manga-list-content" bind:this={container}>
	{#if $style == MangaListStyle.Grid}
		<MediumMangaList {list} />
	{:else if $style == MangaListStyle.Rows}
		<LongMangaList {list} />
	{:else if $style == MangaListStyle.Cover}
		<CoverMangaList {list} />
	{/if}
</div>
