<script lang="ts">
	interface Props {
		coverImage: string;
		coverImageAlt: string;
		blur?: boolean;
	}

	let { coverImage, coverImageAlt, blur }: Props = $props();
</script>

<img src={coverImage} alt={coverImageAlt} class:blur />

<style lang="scss">
	img {
		width: var(--w-base);
		height: var(--img-h);
		object-fit: cover;
		border-radius: 0.25rem;
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
