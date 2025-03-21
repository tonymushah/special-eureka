<script lang="ts">
	import { writable } from "svelte/store";
	import {
		defaultAuthorArtistOptions,
		initMangaSearchAuthorArtistsOptions,
		initMangaSearchAuthorSearchFetcher,
		NaiveAuthorSearchFetcherResultData
	} from "../../contexts/authorArtist";
	import { random, range } from "lodash";
	import { v4 } from "uuid";
	import AuthorArtists from "../AuthorArtists.svelte";

	initMangaSearchAuthorArtistsOptions(writable(defaultAuthorArtistOptions()));
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

<AuthorArtists />
