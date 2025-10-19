<script lang="ts">
	import { type InputMaybe, OrderDirection, type ReportSortOrder } from "@mangadex/gql/graphql";
	import FilterLayout from "./FilterLayout.svelte";

	interface Props {
		order?: InputMaybe<ReportSortOrder>;
	}
	let { order: category = $bindable() }: Props = $props();
</script>

<FilterLayout>
	<label for="report-sort-order-filter">Order: </label>
	<select name="" id="report-sort-order-filter" bind:value={category}>
		<option value={null}>Any</option>
		<option
			value={{
				createdAt: OrderDirection.Ascending
			} satisfies ReportSortOrder}
		>
			Oldly Created
		</option>
		<option
			value={{
				createdAt: OrderDirection.Descending
			} satisfies ReportSortOrder}
		>
			Recently Created
		</option>
	</select>
</FilterLayout>
