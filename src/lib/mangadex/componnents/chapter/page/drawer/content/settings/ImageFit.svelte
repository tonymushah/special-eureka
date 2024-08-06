<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { ImageFit } from "@mangadex/gql/graphql";
	import { derived } from "svelte/store";
	import { isOnZoomableImage } from "../../../contexts/currentChapterReadingMode";
	import { getCurrentChapterImageFitWritable } from "../../../contexts/imageFit";
	import Icon from "./image-fit/Icon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	const isZoomable = isOnZoomableImage();
	const imageFitStore = getCurrentChapterImageFitWritable();
	const label = derived(imageFitStore, ($fit) => {
		switch ($fit) {
			case ImageFit.Default:
				return "Default";
			case ImageFit.Width:
				return "Fit Width";
			case ImageFit.Heigth:
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
					case ImageFit.Default:
						imageFitStore.set(ImageFit.Width);
						break;
					case ImageFit.Width:
						imageFitStore.set(ImageFit.Heigth);
						break;
					case ImageFit.Heigth:
						imageFitStore.set(ImageFit.Default);
						break;
					default:
						break;
				}
			}}
		/>
	</SettingsTransitComp>
{/if}
