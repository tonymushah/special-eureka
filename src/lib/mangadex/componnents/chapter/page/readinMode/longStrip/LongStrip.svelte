<script lang="ts">
	import { derived } from "svelte/store";
	import { getChapterImageContext } from "../../contexts/images";
	import { getLongStripImagesWidthContext } from "./utils/context/longstrip_images_width";

	const images = getChapterImageContext();
	const imageWidth = derived(getLongStripImagesWidthContext(), ($width) => {
		if ($width == 0) {
			return 100;
		} else {
			return Math.abs($width);
		}
	});
</script>

<div class="longstrip">
	<slot name="top" />
	{#each $images as image}
		<div>
			<img src={image} alt={image} width="{$imageWidth}%" />
		</div>
	{/each}
	<slot name="bottom" />
</div>

<style lang="scss">
	img {
		max-width: 100%;
	}
</style>
