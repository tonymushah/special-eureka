<script lang="ts">
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import { derived, get, writable, type Writable } from "svelte/store";
	import SortBySelector from "./SortBySelector.svelte";
	import { initMangaSearchPublicationStatusContextStore } from "@mangadex/componnents/manga/search/form/filter/contexts/publicationStatus";
	import PublicationStatus from "@mangadex/componnents/manga/search/form/filter/content/PublicationStatus.svelte";
	import { initMangaSearchYearContextStore } from "@mangadex/componnents/manga/search/form/filter/contexts/year";
	import Year from "@mangadex/componnents/manga/search/form/filter/content/Year.svelte";
	import { v4 } from "uuid";
	import {
		initMangaSearchAuthorArtistsOptions,
		initMangaSearchAuthorSearchFetcher,
		type AuthorArtistOptions
	} from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist";
	import gqlAuthorFetcher from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist/gql";
	import { onMount } from "svelte";
	import AuthorArtists from "@mangadex/componnents/manga/search/form/filter/content/AuthorArtists.svelte";
	import { route } from "$lib/ROUTES";

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
	initMangaSearchAuthorSearchFetcher(gqlAuthorFetcher);
	// TODO Find a way to sync this proprely
	const authorArtistsParam = writable<AuthorArtistOptions>({ artists: [], authors: [] });
	onMount(() =>
		authorArtistsParam.subscribe(({ authors, artists }) => {
			params.update(($params) => {
				$params.authors = authors.map((author) => author.id);
				$params.artists = artists.map((artist) => artist.id);
				return $params;
			});
		})
	);
	initMangaSearchAuthorArtistsOptions(authorArtistsParam);
	const availableChapterCheckId = v4();
	const excludeContentProfileId = v4();
</script>

<section class="filter-content">
	<div class="row">
		<AuthorArtists />
	</div>
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
	<p>
		Some filters (for tags, content rating, etc...) are not showed here.
		<span class="lazy-af"> because I was lazy to implement that :) </span>
		<br />
		Please change
		<a href={route("/mangadex/settings/content-profiles")} class="basic-link">
			your content profile
		</a> instead.
	</p>
	<p>
		<span class="lazy-af">
			Tony Mushah: To honest, I could do it (really). It just that it doesn't make sense to me
			to add those complex filter thingy here.
		</span>
	</p>
	<p class="lazy-af">
		Also, the author and artists are not saved proprely when this dialog is closed, but it still
		filter though. I am not planning to fix anytime soon. Maybe in future.
	</p>
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
	a.basic-link {
		color: var(--primary-l2);
	}
	.lazy-af {
		font-style: italic;
		color: color-mix(in srgb, var(--main-background) 70%, var(--text-color) 30%);
	}
</style>
