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
		width: var(--w-base);
		height: var(--img-h);
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
