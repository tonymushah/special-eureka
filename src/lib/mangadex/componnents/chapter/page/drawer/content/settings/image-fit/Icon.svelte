<script lang="ts">
	import {
		ImageFit,
		imageFitStore
	} from "@mangadex/componnents/chapter/page/readinMode/zoomableImage/settings";
	import { AlignCenterIcon, AlignJustifyIcon, MehIcon } from "svelte-feather-icons";

	const size = "16";
</script>

{#if $imageFitStore == ImageFit.Height}
	<AlignJustifyIcon {size} />
{:else if $imageFitStore == ImageFit.Width}
	<AlignCenterIcon {size} />
{:else}
	<MehIcon {size} />
{/if}
