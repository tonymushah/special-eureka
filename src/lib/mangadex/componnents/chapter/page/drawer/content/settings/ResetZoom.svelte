<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { isOnZoomableImage } from "../../../contexts/currentChapterReadingMode";
	import { resetZoom } from "../../../contexts/resetZoomEventTarget";
	import ZoomOutIcon from "./reset-zoom/ZoomOutIcon.svelte";
	const zoomable = isOnZoomableImage();
</script>

{#if $zoomable}
	<ButtonAccentOnlyLabel
		on:click={() => {
			resetZoom();
		}}
		icon={ZoomOutIcon}
		label="Reset Zoom"
	/>
{/if}
