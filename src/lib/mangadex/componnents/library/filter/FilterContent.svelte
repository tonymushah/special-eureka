<script lang="ts">
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import { derived, get, type Writable } from "svelte/store";
	import SortBySelector from "./SortBySelector.svelte";
	import { initMangaSearchPublicationStatusContextStore } from "@mangadex/componnents/manga/search/form/filter/contexts/publicationStatus";
	import PublicationStatus from "@mangadex/componnents/manga/search/form/filter/content/PublicationStatus.svelte";
	import { initMangaSearchYearContextStore } from "@mangadex/componnents/manga/search/form/filter/contexts/year";
	import Year from "@mangadex/componnents/manga/search/form/filter/content/Year.svelte";
	import { v4 } from "uuid";

	interface Props {
		params: Writable<UserLibrarySectionParam>;
	}

	let { params }: Props = $props();
	const publicationStatus = derived(params, (params) => params.publicationStatus ?? []);
	initMangaSearchPublicationStatusContextStore({
		subscribe: publicationStatus.subscribe,
		set(value) {
			params.update((param) => {
				param.publicationStatus = value;
				return param;
			});
		},
		update(updater) {
			params.update((param) => {
				param.publicationStatus = updater(get(publicationStatus));
				return param;
			});
		}
	});
	const year = derived(params, (params) => params.year ?? null);
	initMangaSearchYearContextStore({
		subscribe: year.subscribe,
		set(value) {
			params.update((param) => {
				param.year = value;
				return param;
			});
		},
		update(updater) {
			params.update((param) => {
				param.year = updater(get(year));
				return param;
			});
		}
	});
	const availableChapterCheckId = v4();
	const excludeContentProfileId = v4();
</script>

<section class="filter-content">
	<div class="row">
		<PublicationStatus />
		<Year />
	</div>
	<section class="checks">
		<article class="check">
			<input
				class="checkbox"
				type="checkbox"
				id={availableChapterCheckId}
				bind:checked={$params.hasAvailableChapters}
			/>
			<label for={availableChapterCheckId}>Has available chapters</label>
		</article>
		<article class="check">
			<input
				class="checkbox"
				type="checkbox"
				id={excludeContentProfileId}
				bind:checked={$params.excludeContentProfile}
			/>
			<label for={excludeContentProfileId}>Exclude content profile</label>
		</article>
	</section>
	<SortBySelector {params} />
</section>

<style lang="scss">
	.row {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 8px;
		align-items: center;
	}
	.filter-content {
		display: grid;
		gap: 8px;
	}
	.check {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.checkbox {
		width: 20px;
		height: 20px;
	}
	.checks {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
