<script lang="ts">
	import { TagGroup } from "@mangadex/gql/graphql";
	import { defaultMangaFilterParams, init } from "../contexts";
	import MangaSearchFilterDialogContent from "../MangaSearchFilterDialogContent.svelte";
	import { newTagOptionsValue } from "../contexts/tags";
	import { v4 } from "uuid";
	import { writable } from "svelte/store";

	const options = defaultMangaFilterParams();
	(() => {
		const tags = options.tags;
		tags.set(v4(), newTagOptionsValue("Romance", TagGroup.Genre));
		tags.set(v4(), newTagOptionsValue("Comedy", TagGroup.Theme));
		tags.set(v4(), newTagOptionsValue("4-Koma", TagGroup.Format));
	})();
	const { store } = init(writable(options));
</script>

<MangaSearchFilterDialogContent />
