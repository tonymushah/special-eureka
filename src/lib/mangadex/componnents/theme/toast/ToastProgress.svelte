<script lang="ts">
	import { createProgress, melt } from "@melt-ui/svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	const percentage = writable(0);
	interface Props {
		getPercentage: () => number;
	}

	let { getPercentage }: Props = $props();
	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return () => cancelAnimationFrame(frame);
	});
	const {
		elements: { root: progress },
		options: { max }
	} = createProgress({
		max: 100,
		value: percentage
	});
</script>

<div class="progress" use:melt={$progress}>
	<div
		class="bar"
		style={`transform: translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
	></div>
</div>

<style lang="scss">
	.progress {
		position: absolute;
		left: 1.25rem; /* 20px */
		top: 0.25rem; /* 4px */
		height: 0.25rem; /* 4px */
		width: 10%;
		overflow: hidden;
		border-radius: 9999px;
		background-color: var(--accent-l3);
	}
	.bar {
		height: 100%;
		width: 100%;
		background-color: var(--primary-l2);
	}
</style>
