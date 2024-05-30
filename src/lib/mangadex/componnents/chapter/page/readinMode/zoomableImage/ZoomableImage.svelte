<script lang="ts">
	import isAltKeyPressed from "$lib/window-decoration/stores/isAltKeyPressed";
	import panzoom, { type PanzoomObject } from "@panzoom/panzoom";
	import { onDestroy, onMount } from "svelte";
	import { resetZoomKey, zoomSpeedValue } from "./settings";

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
	onMount(() => {
		const event = (e: KeyboardEvent) => {
			resetZoomKey.subscribe((key) => {
				if (e.key == key) {
					toZoomPanZoom?.reset({ animate: true });
				}
			})();
		};
		window.addEventListener("keydown", event);
		return () => {
			window.removeEventListener("keydown", event);
		};
	});
	onDestroy(() => {
		toZoomPanZoom?.destroy();
	});
</script>

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
			<img src={src[0]} alt={alt[0]} />
			<img src={src[1]} alt={alt[1]} />
		{:else if typeof src == "string" && typeof alt == "string"}
			<img {src} {alt} />
		{/if}
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
