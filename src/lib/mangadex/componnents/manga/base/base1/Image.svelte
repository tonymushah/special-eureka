<script lang="ts">
	import { onMount } from "svelte";

	let isLoadingImage = true;
	let isError = false;
	let isSuccess = false;
	interface Props {
		coverImage: string;
		coverImageAlt: string;
	}

	let { coverImage, coverImageAlt }: Props = $props();
	onMount(() => {
		let timer: number | undefined = undefined;
		const img = new Image();
		img.addEventListener(
			"load",
			() => {
				if (timer) {
					window.clearTimeout(timer);
				}
				isLoadingImage = false;
				isSuccess = true;
			},
			{
				once: true
			}
		);
		img.addEventListener(
			"error",
			() => {
				if (timer) {
					window.clearTimeout(timer);
				}
				if (!isSuccess) {
					isLoadingImage = false;
					isError = true;
				}
			},
			{
				once: true
			}
		);
		img.src = coverImage;
		timer = window.setTimeout(() => {
			isLoadingImage = false;
			isError = true;
		});
	});
</script>

<div class="cover-image">
	<img src={coverImage} alt={coverImageAlt} />
</div>

<style lang="scss">
	div.cover-image {
		grid-area: cover;
	}
	div.cover-image > img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
</style>
