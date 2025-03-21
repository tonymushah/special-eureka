<script lang="ts">
	import { getCurrentChapterImageFit } from "@mangadex/componnents/chapter/page/contexts/imageFit";
	import { ImageFit } from "@mangadex/gql/graphql";

	import { AlignCenterIcon, AlignJustifyIcon, MehIcon } from "svelte-feather-icons";
	const imageFitStore = getCurrentChapterImageFit();
	const size = "16";
</script>

{#if $imageFitStore == ImageFit.Heigth}
	<AlignJustifyIcon {size} />
{:else if $imageFitStore == ImageFit.Width}
	<AlignCenterIcon {size} />
{:else}
	<MehIcon {size} />
{/if}
