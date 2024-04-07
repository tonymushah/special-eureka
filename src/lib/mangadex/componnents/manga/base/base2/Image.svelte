<script lang="ts">
	export let coverImage: string;
	export let coverImageAlt: string;
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
