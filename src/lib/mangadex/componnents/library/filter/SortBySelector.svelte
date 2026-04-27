<script lang="ts">
	import SortSelector from "@mangadex/componnents/manga/list/sortSelector/SortSelector.svelte";
	import type { MangaSortOrder, UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import { derived, toStore, type Readable, type Writable } from "svelte/store";
	interface Props {
		params: UserLibrarySectionParam;
	}

	let { params = $bindable() }: Props = $props();
	const sortDer: Readable<MangaSortOrder | undefined> = derived(
		toStore(() => params),
		($params) => {
			return $params.order ?? undefined;
		}
	);
	const sort: Writable<MangaSortOrder | undefined> = {
		subscribe(run, invalidate) {
			return sortDer.subscribe(run, invalidate);
		},
		set(value) {
			params.order = value;
		},
		update(updater) {
			params.order = updater(params.order ?? undefined);
		}
	};
</script>

<section>
	<p>Sort by:</p>
	<SortSelector {sort} />
</section>

<style lang="scss">
	section {
		display: flex;
		align-items: center;
		gap: 10px;
		p {
			margin: 0px;
		}
	}
</style>
