<script lang="ts">
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import type { InputMaybe } from "@mangadex/gql/graphql";
	import FilterLayout from "./FilterLayout.svelte";

	interface Props {
		objectId: InputMaybe<string>;
	}
	let { objectId = $bindable() }: Props = $props();
</script>

<FilterLayout>
	<label for="report-object-id-filter">Object ID: </label>
	<FormInput
		bind:value={objectId}
		inputProps={{
			id: "report-object-id-filter"
		}}
	/>
</FilterLayout>
