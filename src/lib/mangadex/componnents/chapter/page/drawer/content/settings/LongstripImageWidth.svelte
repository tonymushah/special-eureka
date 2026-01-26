<script lang="ts">
	import { isLongStrip } from "../../../contexts/currentChapterReadingMode";
	import { getLongStripImagesWidthContextWritable } from "../../../readinMode/longStrip/utils/context/longstrip_images_width";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import { Slider } from "@ark-ui/svelte/slider";

	const isLong = isLongStrip();
	const imageWidth = getLongStripImagesWidthContextWritable();
</script>

{#if $isLong}
	<SettingsTransitComp>
		<Slider.Root bind:value={() => [$imageWidth], (i) => ($imageWidth = i.at(0) ?? 0)}>
			<div>
				<Slider.Label>Image Width</Slider.Label>
				<Slider.ValueText />
			</div>
			<Slider.Control>
				<Slider.Track>
					<Slider.Range />
				</Slider.Track>
				<Slider.Thumb index={0}>
					<Slider.HiddenInput />
				</Slider.Thumb>
			</Slider.Control>
		</Slider.Root>
	</SettingsTransitComp>
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
