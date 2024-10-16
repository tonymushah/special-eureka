<script lang="ts">
	import MangaSearchForm from "@mangadex/componnents/manga/search/form/MangaSearchForm.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SearchContent from "./SearchContent.svelte";
	import type { PageData } from "./$types";
	import defaultMangaSearchParams, {
		toMangaListParams,
		type MangaSearchParams
	} from "@mangadex/componnents/manga/search/form/state";
	import { derived, writable } from "svelte/store";
	import { TagOptionState } from "@mangadex/componnents/manga/search/form/filter/contexts/tags";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	export let data: PageData;
	const defaultParams = writable(defaultMangaSearchParams());
	$: {
		defaultParams.update((p) => {
			data.tags?.forEach((tag) => {
				p.filter.tags.set(tag.id, {
					state: TagOptionState.NONE,
					name: tag.name,
					group: tag.group
				});
			});
			return p;
		});
	}
	const currentSearchParams = writable<MangaSearchParams | undefined>(undefined);
	const listParams = derived(currentSearchParams, ($p) => {
		if ($p) {
			return toMangaListParams($p);
		} else {
			return {} satisfies MangaListParams;
		}
	});
	let realTime = false;
	const offlineStore = derived(currentSearchParams, ($p) => $p?.offlineOnly ?? false);
</script>

<section class="title">
	<Title>Advanced Titles Search</Title>
</section>

<section class="form-search">
	<MangaSearchForm
		bind:realTime
		defaultParams={$defaultParams}
		on:change={({ detail }) => {
			if (realTime) {
				currentSearchParams.set(detail);
			}
		}}
		on:submit={({ detail }) => {
			if (!realTime) {
				currentSearchParams.set(detail);
			}
		}}
	/>
</section>

<section class="content">
	<SearchContent params={listParams} {offlineStore} />
</section>

<style lang="scss">
	.content {
		margin-top: 12px;
	}
</style>
