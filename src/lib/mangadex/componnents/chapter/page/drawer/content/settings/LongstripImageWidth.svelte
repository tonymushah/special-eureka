<script lang="ts">
	import { isLongStrip } from "../../../contexts/currentChapterReadingMode";
	import { getLongStripImagesWidthContextWritable } from "../../../readinMode/longStrip/utils/context/longstrip_images_width";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import { Slider } from "@ark-ui/svelte/slider";
	import cssMod from "./longstrip-image-width.module.scss";

	const isLong = isLongStrip();
	const imageWidth = getLongStripImagesWidthContextWritable();
</script>

{#if $isLong}
	<SettingsTransitComp>
		<Slider.Root
			class={cssMod.root}
			bind:value={() => [$imageWidth], (i) => ($imageWidth = i.at(0) ?? 0)}
		>
			<div class="label">
				<Slider.Label>Image Width: &nbsp;</Slider.Label>
				<Slider.ValueText />%
			</div>
			<div class="slider-root">
				<Slider.Control class={cssMod.sliderContainer}>
					<Slider.Track class={cssMod.sliderRangeOuter}>
						<Slider.Range class={cssMod.sliderRange} />
					</Slider.Track>
					<Slider.Thumb index={0} class={cssMod.sliderThumbs}>
						<Slider.HiddenInput />
					</Slider.Thumb>
				</Slider.Control>
			</div>
		</Slider.Root>
	</SettingsTransitComp>
{/if}

<style lang="scss">
	.label {
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.slider-root {
		position: relative;
		display: flex;
		height: 20px;
		width: 90%;
		align-items: center;
	}
</style>
