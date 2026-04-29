<script lang="ts">
	import { derived as sderived } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	import pageLimit from "@mangadex/stores/page-limit";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { MangaListParams } from "@mangadex/gql/graphql";

	let refetch: (() => void) | undefined = $state(undefined);
	let params = $derived.by(() => {
		return {
			limit: $pageLimit
		} satisfies MangaListParams;
	});
</script>

<PageTitle onTitleClick={refetch} withReturn>Recently Added Titles</PageTitle>

<AppTitle title="Recently Added - MangaDex" />

<SearchContent bind:refetch {params} />
