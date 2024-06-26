<script lang="ts">
	import { getChapterImageContext } from "../../contexts/images";
	import { currentChapterPage } from "../../stores/currentPage";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";

	const images = getChapterImageContext();
	export let innerOverflow = true;
	$: rtl = $readingDirection == ReadingDirection.Rtl;
</script>

<slot name="top" />

<div class="wide-strip" class:rtl class:innerOverflow>
	<slot name="before" />
	{#each $images as image}
		<div>
			<img src={image} alt={image} />
		</div>
	{/each}
	<slot name="after" />
</div>

<slot name="bottom" />

<style lang="scss">
	.wide-strip {
		display: flex;
		flex-direction: row;
	}
	.wide-strip.rtl {
		flex-direction: row-reverse;
	}
	.wide-strip.innerOverflow {
		overflow-x: scroll;
	}
	img {
		max-height: 100%;
	}
</style>
