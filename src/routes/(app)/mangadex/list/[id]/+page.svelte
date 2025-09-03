<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived as sderived, readable, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const titlesIds = writable<string[]>([]);
	$effect(() => {
		titlesIds.set(data.relationships.titlesIds);
	});
	const params = sderived(titlesIds, (ids) => {
		return {
			mangaIds: ids
		} satisfies MangaListParams;
	});
</script>

<AppTitle title="{data.attributes.name} - MangaDex" />

<SearchContent offlineStore={readable(false)} {params} />
