<script lang="ts">
	import { run } from 'svelte/legacy';

	import SearchContent from "@mangadex/routes/titles/(search)/SearchContent.svelte";
	import type { PageData } from "./$types";
	import { derived, readable, writable } from "svelte/store";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const groupId = writable<string>(data.id);
	run(() => {
		groupId.set(data.id);
	});
	const offlineStore = readable(false);

	const listParams = derived([groupId], ([$id]) => {
		return {
			group: $id
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
