<script lang="ts">
	import MangaSearchForm from "@mangadex/componnents/manga/search/form/MangaSearchForm.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SearchContent from "./SearchContent.svelte";
	import type { PageData } from "./$types";
	import defaultMangaSearchParams, {
		mangaSearchParamsFromContentProfile,
		toMangaListParams,
		type MangaSearchParams
	} from "@mangadex/componnents/manga/search/form/state";
	import { derived, get, writable } from "svelte/store";
	import { TagOptionState } from "@mangadex/componnents/manga/search/form/filter/contexts/tags";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { onMount } from "svelte";
	interface Props {
		data: PageData;
	}

	let { data = $bindable() }: Props = $props();
	const defaultParams = writable(defaultMangaSearchParams());
	$effect(() => {
		return defaultContentProfile.subscribe((defaultProfile) => {
			defaultParams.update((p) => {
				p = mangaSearchParamsFromContentProfile(defaultProfile);
				data.tags?.forEach((tag) => {
					p.filter.tags.set(tag.id, {
						state: TagOptionState.NONE,
						name: tag.name,
						group: tag.group
					});
				});
				defaultProfile.excludedTags.forEach((tag) => {
					const inner_tag = p.filter.tags.get(tag);
					if (inner_tag) {
						inner_tag.state = TagOptionState.EXCLUDE;
						p.filter.tags.set(tag, inner_tag);
					}
				});
				defaultProfile.includedTags.forEach((tag) => {
					const inner_tag = p.filter.tags.get(tag);
					if (inner_tag) {
						inner_tag.state = TagOptionState.INCLUDE;
						p.filter.tags.set(tag, inner_tag);
					}
				});
				return p;
			});
		});
	});
	const currentSearchParams = writable<MangaSearchParams | undefined>(
		undefined,
		(set, _update) => {
			return defaultParams.subscribe((params) => {
				set(params);
			});
		}
	);
	const preListParams = derived(currentSearchParams, ($p) => {
		if ($p) {
			return toMangaListParams($p);
		}
	});
	const isEmpty = derived(preListParams, ($p) => $p == undefined);
	const listParams = derived(preListParams, ($p) => {
		if ($p) {
			return $p;
		} else {
			return {} satisfies MangaListParams;
		}
	});
	let realTime = $state(false);
	const offlineStore = derived(currentSearchParams, ($p) => $p?.offlineOnly ?? false);
</script>

<section class="title">
	<Title>Advanced Titles Search</Title>
</section>

<section class="form-search">
	<MangaSearchForm
		bind:realTime
		bind:defaultParams={$defaultParams}
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
	{#if !$isEmpty}
		<SearchContent params={listParams} {offlineStore} excludeContentProfile />
	{/if}
</section>

<style lang="scss">
	.content {
		margin-top: 12px;
	}
</style>
