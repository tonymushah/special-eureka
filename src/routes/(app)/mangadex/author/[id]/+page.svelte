<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	import { hideReadTitle } from "@mangadex/stores/hide-read-title";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let listParams = $derived.by(() => {
		return {
			authorOrArtist: data.id,
			limit: $pageLimit
		} as MangaListParams;
	});
</script>

<section class="content">
	<SearchContent
		params={listParams}
		offlineStore={false}
		hideReadTitle={$hideReadTitle}
		disableAuthorArtitsBlacklist
	/>
</section>

<style lang="scss">
	.content {
		margin-top: 12px;
	}
</style>
