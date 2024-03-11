<script lang="ts">
	export let coverImage: string;
	export let coverImageAlt: string;
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
