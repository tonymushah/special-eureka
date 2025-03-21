<script lang="ts">
	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived, readable, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const authorId = writable<string>(data.id);
	$effect(() => {
		authorId.set(data.id);
	});
	const offlineStore = readable(false);

	const listParams = derived([authorId], ([$id]) => {
		return {
			authorOrArtist: $id
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
