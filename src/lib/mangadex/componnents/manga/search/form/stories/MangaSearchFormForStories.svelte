<script lang="ts">
	import { random, range } from "lodash";
	import {
		initMangaSearchAuthorSearchFetcher,
		NaiveAuthorSearchFetcherResultData
	} from "../filter/contexts/authorArtist";
	import MangaSearchForm from "../MangaSearchForm.svelte";
	import { v4 } from "uuid";

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
</script>

<MangaSearchForm
	onchange={(detail) => {
		console.debug("change", detail);
	}}
	onsubmit={(detail) => {
		console.debug("submit", detail);
	}}
/>
