<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import ReadingStatusButton from "./buttons/ReadingStatusButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";

	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
	}>();
</script>

<div class="button-group">
	<ReadingStatusButton
		on:readingStatus={({ detail }) => {
			dispatch("readingStatus", detail);
		}}
	/>
</div>
