<script lang="ts">
	import { TagGroup } from "@mangadex/gql/graphql";
	import { defaultMangaFilterParams, init } from "../contexts";
	import MangaSearchFilterDialogContent from "../MangaSearchFilterDialogContent.svelte";
	import { newTagOptionsValue } from "../contexts/tags";
	import { v4 } from "uuid";
	import { writable } from "svelte/store";
	import {
		initMangaSearchAuthorSearchFetcher,
		NaiveAuthorSearchFetcherResultData
	} from "../contexts/authorArtist";
	import { random, range } from "lodash";

	const options = defaultMangaFilterParams();
	(() => {
		const tags = options.tags;
		tags.set(v4(), newTagOptionsValue("Romance", TagGroup.Genre));
		tags.set(v4(), newTagOptionsValue("Comedy", TagGroup.Theme));
		tags.set(v4(), newTagOptionsValue("4-Koma", TagGroup.Format));
	})();
	initMangaSearchAuthorSearchFetcher(async (name) => {
		//await delay(2000);
		console.log(name);
		return {
			data: range(0, random(10, false)).map((value) => ({
				value: `Author ${value}`,
				id: v4()
			})),
			hasNext() {
				return true;
			},
			async next() {
				return new NaiveAuthorSearchFetcherResultData(
					range(0, random(25, false)).map((value) => ({
						value: `Author ${value}`,
						id: v4()
					}))
				);
			}
		};
	});
	const { store } = init(writable(options));
</script>

<MangaSearchFilterDialogContent />
