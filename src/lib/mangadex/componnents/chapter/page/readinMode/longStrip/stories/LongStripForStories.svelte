<script lang="ts">
	import { derived, get, writable, type Readable } from "svelte/store";
	import { initChapterImageContext } from "../../../contexts/images";
	import LongStrip from "../LongStrip.svelte";
	import { initLongStripImagesWidthContext } from "../utils/context/longstrip_images_width";
	import { createSlider, melt } from "@melt-ui/svelte";
	import { initChapterCurrentPageContext } from "../../../contexts/currentPage";
	//import { onMount } from "svelte";
	export let imageWidth = writable(100);
	export let images: string[];
	export let currentPage: number = 0;
	/* const page = */ initChapterCurrentPageContext(writable(currentPage));
	//onMount(() => page.subscribe(console.debug));
	const derivedImageWidth: Readable<number[]> & {
		set: (value: number[]) => void;
	} = {
		subscribe(run, invalidate) {
			return derived(imageWidth, ($i) => {
				return [$i];
			}).subscribe(run, invalidate);
		},
		set(value) {
			imageWidth.set(value[0]);
		}
	};
	const {
		elements: { root, range, thumbs }
	} = createSlider({
		min: 0,
		max: 100,
		step: 1,
		value: {
			subscribe(run, invalidate) {
				return derivedImageWidth.subscribe(run, invalidate);
			},
			update(updater) {
				derivedImageWidth.set(updater(get(derivedImageWidth)));
			},
			set(value) {
				derivedImageWidth.set(value);
			}
		}
	});

	initChapterImageContext(images);
	initLongStripImagesWidthContext(imageWidth);
	const imageWidthShow = derived(imageWidth, ($i) => {
		if ($i == 0) {
			return 100;
		} else {
			return Math.abs($i);
		}
	});
</script>

<h3>
	Image Width: {$imageWidthShow}%
</h3>

<span use:melt={$root} class="slider-root">
	<span class="slider-range-outer">
		<span use:melt={$range} class="slider-range" />
	</span>
	<span use:melt={$thumbs[0]} class="slider-thumbs" />
</span>

<LongStrip />

<style lang="scss">
	h3 {
		margin: 1px;
	}
	.slider-root {
		position: relative;
		display: flex;
		height: 20px;
		width: 100%;
		align-items: center;
	}
	.slider-range-outer {
		height: 3px;
		width: 100%;
		background-color: var(--accent);
		transition: background-color 200ms ease-in-out;
	}
	.slider-range-outer:hover {
		background-color: var(--accent-hover);
	}
	.slider-range {
		height: 3px;
		background-color: var(--primary);
	}
	.slider-thumbs {
		height: 1.25rem;
		width: 1.25rem;
		border-radius: 9999px;
		background-color: var(--primary);
		transition: box-shadow 200ms ease-in-out;
	}
	.slider-thumbs:focus {
		box-shadow: 0 0 0 2px var(--accent-active);
	}
	.slider-thumbs:hover {
		box-shadow: 0 0 0 2px var(--accent-hover);
	}
</style>
