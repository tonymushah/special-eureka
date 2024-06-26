<script lang="ts">
	import { getChapterImageContext } from "../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../stores/readingDirection";

	const images = getChapterImageContext();
	$: rtl = $readingDirection == ReadingDirection.Rtl;
</script>

<slot name="top" />

<div class="wide-strip" class:rtl>
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
		flex-direction: column;
	}
	.wide-strip.rtl {
		flex-direction: column-reverse;
	}
	img {
		max-height: 100%;
	}
</style>
