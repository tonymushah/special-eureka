<script lang="ts">
	import ImageFit from "./settings/ImageFit.svelte";
	import LongstripImageWidth from "./settings/LongstripImageWidth.svelte";
	import ReadingDirection from "./settings/ReadingDirection.svelte";
	import ReadingModeButton from "./settings/ReadingModeButton.svelte";
	import ResetZoom from "./settings/ResetZoom.svelte";
	import SideBarSettings from "./settings/SideBarSettings.svelte";
</script>

<section>
	<ReadingModeButton />
	<ResetZoom />
	<ReadingDirection />
	<ImageFit />
	<LongstripImageWidth />
	<SideBarSettings />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
