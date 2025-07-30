<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived, readable, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const groupId = writable<string>(data.id);
	$effect(() => {
		groupId.set(data.id);
	});
	const offlineStore = readable(false);

	const listParams = derived([groupId, pageLimit], ([$id, $limit]) => {
		return {
			group: $id,
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
