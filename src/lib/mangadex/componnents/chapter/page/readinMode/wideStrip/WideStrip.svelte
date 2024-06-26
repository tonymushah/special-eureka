<script lang="ts">
	import { getChapterImageContext } from "../../contexts/images";
	import { currentChapterPage } from "../../stores/currentPage";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";

	const images = getChapterImageContext();
	export let innerOverflow = true;
	$: rtl = $readingDirection == ReadingDirection.Rtl;
	// TODO Add support with the intersection observer API
	/*new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.getAttribute("data-page")
        })
    })*/
</script>

<slot name="top" />

<div class="wide-strip" class:rtl class:innerOverflow>
	<slot name="before" />
	{#each $images as image, page}
		<div>
			<img src={image} alt={image} data-page={page} />
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
