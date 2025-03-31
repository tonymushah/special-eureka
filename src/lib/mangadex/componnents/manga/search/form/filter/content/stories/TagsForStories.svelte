<script lang="ts">
	import { writable } from "svelte/store";
	import {
		initMangaSearchTagOptionsContextStore,
		newTagOptionsValue,
		type TagOptionsValue
	} from "../../contexts/tags";
	import Tags from "../Tags.svelte";
	import { v4 } from "uuid";
	import { TagGroup } from "@mangadex/gql/graphql";

	initMangaSearchTagOptionsContextStore(
		writable(
			(() => {
				const tags = new Map<string, TagOptionsValue>();
				tags.set(v4(), newTagOptionsValue("Romance", TagGroup.Genre));
				tags.set(v4(), newTagOptionsValue("Comedy", TagGroup.Theme));
				tags.set(v4(), newTagOptionsValue("4-Koma", TagGroup.Format));
				return tags;
			})()
		)
	);
</script>

<Tags />
