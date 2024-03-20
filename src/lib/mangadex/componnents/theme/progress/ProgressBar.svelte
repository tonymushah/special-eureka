<script lang="ts">
	export let lineColor: string;
	export let backgroundColor: string = "var(--contrast-l1)";
	export let progress: number;
	export let height: string = "12px";
</script>

<div class="progress-bar" style="--progress-height: {height}; background-color: {backgroundColor};">
	<div class="line" style="background-color: {lineColor}; width: {progress}%;" />
</div>

<style lang="scss">
	.progress-bar {
		width: 100%;
		position: relative;
		height: var(--progress-height);
		.line {
			height: 100%;
			position: absolute;
		}
	}
</style>
