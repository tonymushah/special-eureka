<script lang="ts">
	import ProgressBar from "@mangadex/componnents/theme/progress/ProgressBar.svelte";

	interface Props {
		distribution: number;
		total: number;
		value: number;
	}

	let { distribution, total, value }: Props = $props();

	let progress = $derived((value / total) * 100);
</script>

<div class="distribution-item">
	<div class="distribution">
		{distribution}
	</div>
	<div class="progress">
		<ProgressBar variant="rounded" lineColor="var(--primary)" {progress} />
	</div>
	<div class="value">
		({value})
	</div>
</div>

<style lang="scss">
	.distribution-item {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 10px;
		justify-content: center;
		align-items: center;
		div {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
		}
		.distribution {
			grid-column: 1/1;
		}
		.progress {
			grid-column: 2/11;
		}
		.value {
			grid-column: 11/-1;
		}
	}
</style>
