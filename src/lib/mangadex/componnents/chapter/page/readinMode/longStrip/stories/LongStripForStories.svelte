<script lang="ts">
	import { derived, get, writable, type Readable } from "svelte/store";
	import { initChapterImageContext } from "../../../contexts/images";
	import LongStrip from "../LongStrip.svelte";
	import { initLongStripImagesWidthContext } from "../utils/context/longstrip_images_width";
	import { createSlider, melt } from "@melt-ui/svelte";
	export let imageWidth = writable(100);
	export let images: string[];
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
	const i_width = initLongStripImagesWidthContext(imageWidth);
</script>

<span use:melt={$root} class="slider-root">
	<span class="slider-range-outer">
		<span use:melt={$range} class="slider-range" />
	</span>
	<span use:melt={$thumbs[0]} class="slide-thumbs" />
</span>

<LongStrip />

<style lang="scss">
	.slider-root {
		position: relative;
		display: flex;
		height: 20px;
		width: 200px;
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
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		background-color: var(--primary);
		transition: box-shadow 200ms ease-in-out;
	}
	.slider-thumbs:focus {
		box-shadow: 10px var(--accent-active);
	}
</style>
