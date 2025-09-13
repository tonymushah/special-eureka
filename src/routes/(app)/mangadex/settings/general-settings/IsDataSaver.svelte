<script lang="ts">
	import { chapterQualityMutation, isDataSaver } from "@mangadex/stores/chapterQuality";
</script>

<div>
	<input
		type="checkbox"
		bind:checked={$isDataSaver}
		disabled={$chapterQualityMutation.isPending}
		class="checkbox"
	/>
	<h3>Data Saver</h3>
</div>
<p>Reduce data usage by viewing lower quality versions of chapters.</p>

<style lang="scss">
	.checkbox {
		width: 24px;
		height: 24px;
		border-radius: 12px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 6px;
		h3 {
			margin: 0px;
		}
	}
	p {
		margin: 0px;
	}
</style>
