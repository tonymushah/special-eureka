<script lang="ts">
	import ReadingStatusButton from "./buttons/ReadingStatusButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import StarButton from "./buttons/StarButton.svelte";

	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
		rating: number;
	}>();
</script>

<div class="button-group">
	<ReadingStatusButton
		on:readingStatus={({ detail }) => {
			dispatch("readingStatus", detail);
		}}
	/>
	<StarButton
		on:select={({ detail }) => {
			dispatch("rating", detail);
		}}
	/>
</div>

<style lang="scss">
	.button-group {
		display: flex;
		gap: 10px;
	}
</style>
