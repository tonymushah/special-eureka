<script lang="ts">
	import type { Tag } from "@melt-ui/svelte";
	import { writable } from "svelte/store";
	import {
		initMangaSearchAuthorSearchFetcher,
		NaiveAuthorSearchFetcherResultData
	} from "../../../contexts/authorArtist";
	import { v4 } from "uuid";
	import { random, range } from "lodash";
	import AuthorsSearchSelect from "../AuthorsSearchSelect.svelte";

	const delay = (delay: number) => new Promise((res) => setTimeout(() => res(undefined), delay));

	const store = writable<Tag[]>([]);
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

<AuthorsSearchSelect {store} />
