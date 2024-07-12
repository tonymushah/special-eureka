<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { isOnZoomableImage } from "../../../contexts/currentChapterReadingMode";
	import { resetZoom } from "../../../contexts/resetZoomEventTarget";
	import ZoomOutIcon from "./reset-zoom/ZoomOutIcon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	const zoomable = isOnZoomableImage();
</script>

{#if $zoomable}
	<SettingsTransitComp>
		<ButtonAccentOnlyLabel
			on:click={() => {
				resetZoom();
			}}
			icon={ZoomOutIcon}
			label="Reset Zoom"
		/>
	</SettingsTransitComp>
{/if}
