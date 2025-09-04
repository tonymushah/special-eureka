<script lang="ts">
	import { derived as sderived } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	import pageLimit from "@mangadex/stores/page-limit";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	let refetch: (() => void) | undefined = $state(undefined);
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<PageTitle onTitleClick={refetch} withReturn>Recently Added Titles</PageTitle>

<AppTitle title="Recently Added - MangaDex" />

<SearchContent
	bind:refetch
	params={sderived(pageLimit, (e) => ({
		limit: e
	}))}
/>
