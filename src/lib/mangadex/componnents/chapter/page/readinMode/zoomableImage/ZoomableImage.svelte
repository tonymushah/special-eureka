<script lang="ts">
	import isAltKeyPressed from "$lib/window-decoration/stores/isAltKeyPressed";
	import panzoom, { type PanzoomObject } from "@panzoom/panzoom";
	import { onDestroy, onMount } from "svelte";
	import { resetZoomKey, zoomSpeedValue } from "./settings";
	import { derived } from "svelte/store";
	import { ImageFit, imageFitStore } from "./settings";

	export let src: string | [string, string];
	export let alt: string | [string, string];

	let toZoom: HTMLElement | undefined = undefined;
	let toZoomPanZoom: PanzoomObject | undefined;
	$: {
		if (toZoom) {
			toZoomPanZoom = panzoom(toZoom, {
				animate: true
			});
		}
	}
	onDestroy(() => {
		toZoomPanZoom?.reset({ animate: true });
		toZoomPanZoom?.destroy();
	});
	const shouldFitWidth = derived(imageFitStore, ($i) => $i == ImageFit.Width);
	const shouldFitHeight = derived(imageFitStore, ($i) => $i == ImageFit.Height);
	onMount(() => imageFitStore.subscribe(() => toZoomPanZoom?.reset({ animate: true })));
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key == $resetZoomKey) {
			toZoomPanZoom?.reset({ animate: true });
		}
	}}
/>

<div
	role="none"
	class="outer"
	on:wheel|preventDefault={(e) => {
		const zoomElement = toZoomPanZoom;
		if (zoomElement) {
			let scale = zoomElement.getScale();
			scale += e.deltaY * (-0.001 * $zoomSpeedValue);

			// Restrict scale
			scale = Math.min(Math.max(0.75, scale), 5);
			zoomElement.zoomToPoint(scale, e, {
				animate: true
			});
		}
	}}
>
	<div class="toZoom" bind:this={toZoom}>
		{#if Array.isArray(src) && Array.isArray(alt)}
			<div
				class="double-image"
				class:fitWidth={$shouldFitWidth}
				class:fitHeight={$shouldFitHeight}
			>
				{#key src[0]}
					<img src={src[0]} alt={alt[0]} />
				{/key}
				{#key src[1]}
					<img src={src[1]} alt={alt[1]} />
				{/key}
			</div>
		{:else if typeof src == "string" && typeof alt == "string"}
			<div
				class="single-image"
				class:fitWidth={$shouldFitWidth}
				class:fitHeight={$shouldFitHeight}
			>
				{#key src}
					<img {src} {alt} />
				{/key}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	div.outer {
		width: 100%;
		height: 100cqh;
		.toZoom {
			height: 100%;
			div.double-image {
				display: flex;
				justify-content: center;
				img {
					object-fit: none;
					width: max-content;
					height: max-content;
				}
			}
			div.double-image.fitHeight {
				height: 100%;
				align-items: center;
				img {
					object-fit: contain;
					height: 100%;
				}
			}
			div.double-image.fitWidth {
				width: max-content;
				display: grid;
				height: 100%;
				grid-template-rows: 2;
				img {
					grid-row: 1;
					height: 100%;
					object-fit: contain;
					width: 100%;
				}
			}
			div.single-image {
				img {
					object-fit: none;
					width: max-content;
					height: max-content;
				}
			}
			div.single-image.fitWidth {
				width: 100%;
				height: fit-content;
				img {
					object-fit: contain;
					width: 100%;
					height: 100%;
				}
			}
			div.single-image.fitHeight {
				height: 100%;
				width: fit-content;
				img {
					object-fit: contain;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
