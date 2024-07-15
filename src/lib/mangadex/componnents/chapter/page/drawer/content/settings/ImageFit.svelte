<script lang="ts">
	import { derived } from "svelte/store";
	import { isOnZoomableImage } from "../../../contexts/currentChapterReadingMode";
	import { ImageFit, imageFitStore } from "../../../readinMode/zoomableImage/settings";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./image-fit/Icon.svelte";

	const isZoomable = isOnZoomableImage();
	const label = derived(imageFitStore, ($fit) => {
		switch ($fit) {
			case ImageFit.None:
				return "Default";
			case ImageFit.Width:
				return "Fit Width";
			case ImageFit.Height:
				return "Fit Height";
			default:
				return "None";
		}
	});
</script>

{#if $isZoomable}
	<SettingsTransitComp>
		<ButtonAccentOnlyLabel
			icon={Icon}
			oneLine
			variant="3"
			label={$label}
			on:click={() => {
				switch ($imageFitStore) {
					case ImageFit.None:
						imageFitStore.set(ImageFit.Width);
						break;
					case ImageFit.Width:
						imageFitStore.set(ImageFit.Height);
						break;
					case ImageFit.Height:
						imageFitStore.set(ImageFit.None);
						break;
					default:
						break;
				}
			}}
		/>
	</SettingsTransitComp>
{/if}
