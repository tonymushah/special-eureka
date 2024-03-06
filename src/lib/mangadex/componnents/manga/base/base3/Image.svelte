<script lang="ts">
	export let coverImage: string;
	export let coverImageAlt: string;
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
