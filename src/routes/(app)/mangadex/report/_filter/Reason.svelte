<script lang="ts">
	import { createReportReasonListQuery } from "@mangadex/gql-docs/report";
	import type { InputMaybe, ReportCategory } from "@mangadex/gql/graphql";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import FilterLayout from "./FilterLayout.svelte";

	interface Props {
		category: InputMaybe<ReportCategory>;
		reasonId: InputMaybe<string>;
	}
	let { category, reasonId = $bindable() }: Props = $props();

	let reasons = $derived(createReportReasonListQuery(category ?? undefined));
</script>

<FilterLayout>
	<label for="report-reasons-filter">Reasons: </label>
	<select
		name=""
		id="report-reasons-filter"
		bind:value={reasonId}
		disabled={category == undefined || category == null || reasons.isLoading}
	>
		<option value={null}>Any</option>
		{#if reasons.isSuccess}
			{#each reasons.data as reason}
				<option value={reason.id}
					>{get_value_from_title_and_random_if_undefined(
						reason.attributes.reason,
						"key"
					)}</option
				>
			{/each}
		{/if}
	</select>
</FilterLayout>
