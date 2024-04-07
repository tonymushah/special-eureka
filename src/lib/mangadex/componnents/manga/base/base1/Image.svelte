<script lang="ts">
	import { onMount } from "svelte";

	let isLoadingImage = true;
	let isError = false;
	let isSuccess = false;
	export let coverImage: string;
	export let coverImageAlt: string;
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
		height: 160px;
		width: 100px;
		object-fit: cover;
	}
</style>
