<script lang="ts">
	import { ImageFit } from "@mangadex/gql/graphql";
	import panzoom, { type PanzoomObject } from "@panzoom/panzoom";
	import { onDestroy, onMount } from "svelte";
	import { derived } from "svelte/store";
	import { getCurrentChapterImageFit } from "../../contexts/imageFit";
	import { addListenerToResetZoomEventTarget } from "../../contexts/resetZoomEventTarget";
	import { resetZoomKey, zoomSpeedValue } from "./settings";
	import type { OnContextMenu } from ".";

	interface Props {
		src: string | [string, string];
		alt: string | [string, string];
		noZoom?: boolean;
		oncontextmenu?: OnContextMenu;
	}

	let { src, alt, noZoom, oncontextmenu }: Props = $props();

	const imageFitStore = getCurrentChapterImageFit();
	let toZoom: HTMLElement | undefined = $state(undefined);
	let toZoomPanZoom: PanzoomObject | undefined = $state();
	$effect(() => {
		if (toZoom && !noZoom) {
			toZoomPanZoom = panzoom(toZoom, {
				animate: true
			});
		}
	});
	onDestroy(() => {
		toZoomPanZoom?.reset({ animate: true });
		toZoomPanZoom?.destroy();
	});
	onMount(() =>
		addListenerToResetZoomEventTarget(() => {
			toZoomPanZoom?.reset({ animate: true });
		})
	);
	const shouldFitWidth = derived(imageFitStore, ($i) => $i == ImageFit.Width);
	const shouldFitHeight = derived(imageFitStore, ($i) => $i == ImageFit.Heigth);
	onMount(() => imageFitStore.subscribe(() => toZoomPanZoom?.reset({ animate: true })));
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key == $resetZoomKey) {
			toZoomPanZoom?.reset({ animate: true });
		}
	}}
/>

<div
	role="none"
	class="outer"
	onwheel={(e) => {
		e.preventDefault();
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
					<img
						src={src[0]}
						alt={alt[0]}
						oncontextmenu={(e) => {
							oncontextmenu?.({
								...e,
								source: "left"
							});
						}}
					/>
				{/key}
				{#key src[1]}
					<img
						src={src[1]}
						alt={alt[1]}
						oncontextmenu={(e) => {
							oncontextmenu?.({
								...e,
								source: "right"
							});
						}}
					/>
				{/key}
			</div>
		{:else if typeof src == "string" && typeof alt == "string"}
			<div
				class="single-image"
				class:fitWidth={$shouldFitWidth}
				class:fitHeight={$shouldFitHeight}
			>
				{#key src}
					<img
						{src}
						{alt}
						oncontextmenu={(e) => {
							oncontextmenu?.({
								...e
							});
						}}
					/>
				{/key}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	div.outer {
		width: 100%;
		height: 100%;
		.toZoom {
			height: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			div.double-image:not(.fitHeight, .fitWidth) {
				display: grid;
				grid-template-rows: 2;
				img {
					grid-row: 1;
					object-fit: contain;
				}
			}
			div.double-image.fitHeight {
				display: flex;
				height: 100%;
				align-items: center;
				justify-content: center;
				max-width: 100%;
				/*div {
					height: 100%;
					width: 100%;
				}*/
				img {
					height: 100%;
					max-width: 100%;
					object-fit: contain;
				}
			}
			div.double-image.fitWidth {
				width: 100%;
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
					object-fit: contain;
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
