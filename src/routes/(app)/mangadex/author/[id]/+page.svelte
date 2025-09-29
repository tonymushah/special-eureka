<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived, readable, toStore, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const authorId = toStore(() => data.id);
	const offlineStore = readable(false);

	const listParams = derived([authorId, pageLimit], ([$id, $limit]) => {
		return {
			authorOrArtist: $id,
			limit: $limit
		} as MangaListParams;
	});
</script>

<section class="content">
	<SearchContent params={listParams} {offlineStore} />
</section>

<style lang="scss">
	.content {
		margin-top: 12px;
	}
</style>
