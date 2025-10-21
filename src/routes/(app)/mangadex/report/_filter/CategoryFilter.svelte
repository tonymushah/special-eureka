<script lang="ts">
	import { ReportCategory, type InputMaybe } from "@mangadex/gql/graphql";
	import FilterLayout from "./FilterLayout.svelte";

	interface Props {
		category?: InputMaybe<ReportCategory>;
	}
	let { category = $bindable() }: Props = $props();
</script>

<FilterLayout>
	<label for="report-category-filter">Category: </label>
	<select name="" id="report-category-filter" bind:value={category}>
		<option value={null}>Any</option>
		<option value={ReportCategory.Author}>Author</option>
		<option value={ReportCategory.Chapter}>Chapter</option>
		<option value={ReportCategory.Manga}>Manga</option>
		<option value={ReportCategory.ScanlationGroup}>Scanlation Group</option>
		<option value={ReportCategory.User}>User</option>
	</select>
</FilterLayout>
