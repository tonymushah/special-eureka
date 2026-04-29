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
	const sortDataMapRev = new Map(
		Object.entries(sortsData).map(([key, value]) => [JSON.stringify(value), key])
	);
</script>

<script lang="ts">
	import { createListCollection } from "@ark-ui/svelte/select";

	import SelectSortOrderBase from "@mangadex/componnents/theme/selects/sort-order-base/SelectSortOrderBase.svelte";

	import { OrderDirection, type MangaSortOrder } from "@mangadex/gql/graphql";

	interface Props {
		sort: MangaSortOrder | undefined;
	}
	let { sort = $bindable() }: Props = $props();
	const collection = createListCollection({ items: sortDataMap.keys().toArray() });
</script>

<SelectSortOrderBase
	{collection}
	disableClear
	bind:value={
		() => {
			if (sort == undefined) {
				return undefined;
			} else {
				const res = sortDataMapRev.get(JSON.stringify({ ...sort }));
				if (res) {
					return [res];
				} else {
					return [];
				}
			}
		},
		(val) => {
			if (val) {
				if (val.length > 0) {
					sort = sortDataMap.get(val[0]);
				} else {
					sort = undefined;
				}
			} else {
				sort = undefined;
			}
		}
	}
/>
