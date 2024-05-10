<script lang="ts">
	import panzoom, { type PanZoom } from "panzoom";
	import { onMount } from "svelte";

	export let src: string;
	export let alt: string;
	let toZoom: HTMLElement | undefined = undefined;
	let toZoomPanZoom: PanZoom | undefined;
	$: {
		if (toZoom) {
			toZoomPanZoom = panzoom(toZoom, {
				minZoom: 1,
				boundsPadding: 1
			});
		}
	}
</script>

<div class="outer">
	<div class="toZoom" bind:this={toZoom}>
		<img {src} {alt} />
	</div>
</div>

<style lang="scss">
	div.outer {
		width: 100%;
		height: 100cqh;
		.toZoom {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
		img {
			height: 100%;
		}
	}
</style>
