<script lang="ts" module>
	const sortsData: Record<string, MangaSortOrder> = {
		"Recently Created": {
			createdAt: OrderDirection.Descending,
		},
		"Anciently Created": {
			createdAt: OrderDirection.Ascending,
		},
		"Most Followed": {
			followedCount: OrderDirection.Descending,
		},
		"Least Followed": {
			followedCount: OrderDirection.Ascending,
		},
		"Latest Upload": {
			latestUploadedChapter: OrderDirection.Descending,
		},
		"Oldest Upload": {
			latestUploadedChapter: OrderDirection.Ascending,
		},
		"Relevance Ascending": {
			relevance: OrderDirection.Ascending,
		},
		"Relevance Descending": {
			relevance: OrderDirection.Descending,
		},
		"Title Ascending": {
			title: OrderDirection.Ascending,
		},
		"Title Descending": {
			title: OrderDirection.Descending,
		},
		"Recently Updated": {
			updatedAt: OrderDirection.Descending,
		},
		"Anciently Updated": {
			updatedAt: OrderDirection.Ascending,
		},
		"Year Ascending": {
			year: OrderDirection.Ascending,
		},
		"Year Descending": {
			year: OrderDirection.Descending,
		},
	};
	const sortDataMap = new Map(
		Object.entries(sortsData).map(([key, value]) => [key, value]),
	);
	const sortDataMapRev = new Map(
		Object.entries(sortsData).map(([key, value]) => [
			JSON.stringify(value),
			key,
		]),
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
	const collection = createListCollection({
		items: sortDataMap.keys().toArray(),
	});
	$inspect(sort);
</script>

<SelectSortOrderBase
	{collection}
	disableClear
	bind:value={
		() => {
			if (sort == undefined) {
				return [];
			} else {
				const key = JSON.stringify({
					...sort,
				});
				const res = sortDataMapRev.get(key);
				if (res) {
					return [res];
				} else {
					return [];
				}
			}
		},
		(val) => {
			console.log(val);
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
