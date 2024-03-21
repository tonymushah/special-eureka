<script lang="ts">
	export let lineColor: string;
	export let backgroundColor: string = "var(--contrast-l1)";
	export let progress: number;
	export let height: string = "12px";
	export let variant: "rounded" | "solid" = "solid";

	$: rounded = variant == "rounded";
</script>

<div
	class="progress-bar"
	class:rounded
	style="--progress-height: {height}; background-color: {backgroundColor};"
>
	<div class="line" class:rounded style="background-color: {lineColor}; width: {progress}%;" />
</div>

<style lang="scss">
	.progress-bar.rounded {
		border-radius: 0.25em;
		.line.rounded {
			border-radius: 0.25em;
		}
	}
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
