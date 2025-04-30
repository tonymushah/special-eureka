<script lang="ts">
	interface Props {
		lineColor: string;
		backgroundColor?: string;
		progress: number;
		height?: string;
		variant?: "rounded" | "solid";
	}

	let {
		lineColor,
		backgroundColor = "var(--contrast-l1)",
		progress,
		height = "12px",
		variant = "solid"
	}: Props = $props();

	let rounded = $derived(variant == "rounded");
</script>

<div
	class="progress-bar"
	class:rounded
	style="--progress-height: {height}; background-color: {backgroundColor};"
>
	<div
		class="line"
		class:rounded
		style="background-color: {lineColor}; width: {progress}%;"
	></div>
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
