<script lang="ts">
	import SortSelector from "@mangadex/componnents/manga/list/sortSelector/SortSelector.svelte";
	import type { MangaSortOrder, UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import { derived, type Readable, type Writable } from "svelte/store";
	interface Props {
		params: Writable<UserLibrarySectionParam>;
	}

	let { params }: Props = $props();
	const sortDer: Readable<MangaSortOrder | undefined> = derived(params, ($params) => {
		return $params.order ?? undefined;
	});
	const sort: Writable<MangaSortOrder | undefined> = {
		subscribe(run, invalidate) {
			return sortDer.subscribe(run, invalidate);
		},
		set(value) {
			params.update((param) => {
				param.order = value;
				return param;
			});
		},
		update(updater) {
			params.update((param) => {
				param.order = updater(param.order ?? undefined);
				return param;
			});
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
