<script lang="ts" module>
	const sortsData: Record<string, MangaSortOrder> = {
		"Recently Created": {
			createdAt: OrderDirection.Ascending
		},
		"Anciently Created": {
			createdAt: OrderDirection.Descending
		},
		"Most Followed": {
			followedCount: OrderDirection.Ascending
		},
		"Least Followed": {
			followedCount: OrderDirection.Descending
		},
		"Latest Upload": {
			latestUploadedChapter: OrderDirection.Ascending
		},
		"Oldest Upload": {
			latestUploadedChapter: OrderDirection.Descending
		},
		"Relevance Ascending": {
			relevance: OrderDirection.Ascending
		},
		"Relevance Descending": {
			relevance: OrderDirection.Descending
		},
		"Title Ascending": {
			title: OrderDirection.Ascending
		},
		"Title Descending": {
			title: OrderDirection.Descending
		},
		"Recently Updated": {
			updatedAt: OrderDirection.Ascending
		},
		"Anciently Updated": {
			updatedAt: OrderDirection.Descending
		},
		"Year Ascending": {
			year: OrderDirection.Ascending
		},
		"Year Descending": {
			year: OrderDirection.Descending
		}
	};
	const sortDataMap = new Map(Object.entries(sortsData).map(([key, value]) => [key, value]));
</script>

<script lang="ts">
	import { createListCollection } from "@ark-ui/svelte/select";

	import SelectSortOrderBase from "@mangadex/componnents/theme/selects/sort-order-base/SelectSortOrderBase.svelte";

	import { OrderDirection, type MangaSortOrder } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";

	interface Props {
		sort: Writable<MangaSortOrder | undefined>;
	}
	let { sort }: Props = $props();
	const collection = createListCollection({ items: sortDataMap.keys().toArray() });
	let bal = $state<string[]>([]);
	$effect(() => {
		sort.set(sortDataMap.get(bal[0]));
	});
</script>

<SelectSortOrderBase {collection} bind:value={bal} />
