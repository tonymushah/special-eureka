<script lang="ts">
	import { derived, get, type Readable } from "svelte/store";
	import { isLongStrip } from "../../../contexts/currentChapterReadingMode";
	import { getLongStripImagesWidthContextWritable } from "../../../readinMode/longStrip/utils/context/longstrip_images_width";
	import { createSlider, createTooltip, melt } from "@melt-ui/svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import { fade } from "svelte/transition";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";

	const isLong = isLongStrip();
	const imageWidth = getLongStripImagesWidthContextWritable();
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
	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: "bottom"
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
	const tooltipContent = derived(imageWidth, ($iw) => {
		if ($iw == 0) {
			return 100;
		} else {
			return $iw;
		}
	});
</script>

{#if $isLong}
	<SettingsTransitComp>
		<div class="root">
			<h4>Image Width</h4>
			<div class="slider-container">
				<span use:melt={$root} class="slider-root">
					<span class="slider-range-outer">
						<span use:melt={$range} class="slider-range"></span>
					</span>
					<span use:melt={$thumbs[0]} use:melt={$trigger} class="slider-thumbs"> </span>
				</span>
			</div>
		</div>
	</SettingsTransitComp>
{/if}

{#if $open}
	<div class="tooltip" use:melt={$content} transition:fade={{ duration: 100 }}>
		<MangaDexVarThemeProvider>
			<div class="tooltip-content">
				<div use:melt={$arrow}></div>
				<h4>{$tooltipContent}%</h4>
			</div>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.tooltip {
		z-index: 10;
		.tooltip-content {
			box-shadow:
				0 1px 3px 0 rgb(0 0 0 / 0.1),
				0 1px 2px -1px rgb(0 0 0 / 0.1);
			border-radius: 0.5rem;
			background-color: var(--accent-l2);
			color: var(--text-color);
			h4 {
				margin: 0px;
				padding-left: 0.875rem; /* 14px */
				padding-right: 0.875rem; /* 14px */
				padding-top: 0.25rem; /* 10px */
				padding-bottom: 0.25rem; /* 10px */
			}
		}
	}

	h4 {
		margin: 0px;
	}
	.root {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.slider-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.slider-root {
		position: relative;
		display: flex;
		height: 20px;
		width: 90%;
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
