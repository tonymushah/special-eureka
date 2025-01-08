<script lang="ts">
	interface Props {
		coverImage: string;
		coverImageAlt: string;
	}

	let { coverImage, coverImageAlt }: Props = $props();
</script>

<div class="cover">
	<img src={coverImage} alt={coverImageAlt} />
</div>

<style lang="scss">
	div.cover > img {
		height: 11em;
		object-fit: cover;
		width: 7em;
	}
</style>
