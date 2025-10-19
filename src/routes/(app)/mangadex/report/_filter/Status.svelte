<script lang="ts">
	import { ReportStatus, type InputMaybe } from "@mangadex/gql/graphql";
	import FilterLayout from "./FilterLayout.svelte";

	interface Props {
		status?: InputMaybe<ReportStatus>;
	}
	let { status = $bindable() }: Props = $props();
</script>

<FilterLayout>
	<label for="report-status-filter">Status: </label>
	<select name="" id="report-status-filter" bind:value={status}>
		<option value={null}>Any</option>
		<option value={ReportStatus.Accepted}>Accepted</option>
		<option value={ReportStatus.Autoresolved}>Autoresolved</option>
		<option value={ReportStatus.Refused}>Refused</option>
		<option value={ReportStatus.Waiting}>Waiting</option>
	</select>
</FilterLayout>
