<script lang="ts">
	import { getChapterImageContext } from "../../contexts/images";

	const images = getChapterImageContext();
</script>

<div class="longstrip">
	<slot name="top" />
	{#each $images as image}
		<div>
			<img src={image} alt={image} />
		</div>
	{/each}
	<slot name="bottom" />
</div>

<style lang="scss">
	img {
		max-width: 100%;
	}
</style>
