<script lang="ts">
	export let coverImage: string;
	export let coverImageAlt: string;
</script>

<img src={coverImage} alt={coverImageAlt} />

<style lang="scss">
	img {
		width: 9.5em;
		height: 12.5em;
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
