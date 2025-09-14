<script lang="ts">
	interface Props {
		coverImage: string;
		coverImageAlt: string;
		blur?: boolean;
	}

	let { coverImage, coverImageAlt, blur }: Props = $props();
</script>

<div class="cover">
	<img src={coverImage} alt={coverImageAlt} class:blur />
</div>

<style lang="scss">
	div.cover > img {
		height: 11em;
		object-fit: cover;
		width: 7em;
	}
	img {
		transition: filter 100ms ease-in-out;
	}
	img.blur {
		filter: blur(10px);
	}
	img.blur:hover {
		filter: blur(5px);
	}
</style>
