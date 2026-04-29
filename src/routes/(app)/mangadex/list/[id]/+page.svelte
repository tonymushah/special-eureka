<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived as sderived, readable, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { hideReadTitle } from "@mangadex/stores/hide-read-title";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const params = $derived.by(() => {
		return {
			mangaIds: data.relationships.titlesIds
		} satisfies MangaListParams;
	});
</script>

<AppTitle title="{data.attributes.name} - MangaDex" />

<SearchContent offlineStore={false} {params} hideReadTitle={$hideReadTitle} />
