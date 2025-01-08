<script lang="ts">
	interface Props {
		coverImage: string;
		coverImageAlt: string;
	}

	let { coverImage, coverImageAlt }: Props = $props();
</script>

<img src={coverImage} alt={coverImageAlt} />

<style lang="scss">
	img {
		width: var(--element-w);
		height: var(--element-h);
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
