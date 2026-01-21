<!-- TODO -->

<script lang="ts" module>
	const sortsData: Record<string, Order> = {
		"Chapter Ascending": {
			chapter: OrderDirection.Ascending
		},
		"Chapter Descending": {
			chapter: OrderDirection.Descending
		},
		"Created At Ascending": {
			createdAt: OrderDirection.Ascending
		},
		"Created At Descending": {
			createdAt: OrderDirection.Descending
		},
		"Publish At Ascending": {
			publishAt: OrderDirection.Ascending
		},
		"Publish At Descending": {
			publishAt: OrderDirection.Descending
		},
		"Readable At Ascending": {
			readableAt: OrderDirection.Ascending
		},
		"Readable At Descending": {
			readableAt: OrderDirection.Descending
		},
		"Updated At Ascending": {
			updatedAt: OrderDirection.Ascending
		},
		"Updated At Descending": {
			updatedAt: OrderDirection.Descending
		},
		"Volume Ascending": {
			volume: OrderDirection.Ascending
		},
		"Volume Descending": {
			volume: OrderDirection.Descending
		}
	};
	const sortDataMap = new Map(Object.entries(sortsData).map(([key, value]) => [key, value]));
</script>

<script lang="ts">
	import { OrderDirection, type ChapterSortOrder as Order } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";
	import { createListCollection } from "@ark-ui/svelte/select";
	import SelectSortOrderBase from "@mangadex/componnents/theme/selects/sort-order-base/SelectSortOrderBase.svelte";
	interface Props {
		sort: Writable<Order | undefined>;
	}
	let { sort }: Props = $props();
	const collection = createListCollection({ items: sortDataMap.keys().toArray() });
	let bal = $state<string[]>([]);
	$effect(() => {
		sort.set(sortDataMap.get(bal[0]));
	});
</script>

<SelectSortOrderBase {collection} bind:value={bal} />
