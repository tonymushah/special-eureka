<script lang="ts">
	import { ReadingStatus } from "@mangadex/gql/graphql";
	import type { Writable } from "svelte/store";

	interface Props {
		readingStatus: Writable<ReadingStatus | undefined>;
		disabled?: boolean;
	}

	let { readingStatus, disabled }: Props = $props();
</script>

<select bind:value={$readingStatus} {disabled}>
	<option value={undefined}>None</option>
	<option value={ReadingStatus.Reading}>Reading</option>
	<option value={ReadingStatus.OnHold}>On Hold</option>
	<option value={ReadingStatus.Dropped}>Dropped</option>
	<option value={ReadingStatus.PlanToRead}>Plan to Read</option>
	<option value={ReadingStatus.Completed}>Completed</option>
	<option value={ReadingStatus.ReReading}>Re-Reading</option>
</select>

<style lang="scss">
	select {
		background-color: var(--accent);
		border-radius: 6px;
		padding: 8px 12px;
		border: 3px solid var(--mid-tone);
		min-height: 3em;
		min-width: 3em;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
</style>
