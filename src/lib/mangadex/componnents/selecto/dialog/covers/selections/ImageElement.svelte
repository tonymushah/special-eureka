<script lang="ts">
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import { get_cover_image } from "@mangadex/utils/cover-art/get_cover_art.svelte";

	interface Props {
		coverId: string;
		onclick?: () => void;
	}
	let { coverId, onclick }: Props = $props();

	let query = get_cover_image(() => ({
		id: coverId,
		quality: "256"
	}));
</script>

{#if query.isSuccess}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<img
		class="image"
		src={query.data}
		alt={coverId}
		{onclick}
		tabindex="0"
		onkeydown={(e) => {
			if (e.key == "Enter") {
				onclick?.();
			}
		}}
	/>
{:else if query.isError}
	<button class="image error" {onclick}> Cannot load image... </button>
{:else}
	<button class="image loading" {onclick}>
		<Fetching />
	</button>
{/if}

<style lang="scss">
	.image {
		display: flex;
		width: 100%;
	}
	img.image {
		border-radius: 3px;
	}
	img.image:active {
		filter: brightness(90%);
		transform: scale(0.95, 0.95);
	}
	img.image:hover {
		transform: scale(1.025, 1.025);
	}
	button.image {
		margin-top: 3px;
		align-items: center;
		justify-content: center;
		height: 12em;
		font-family: var(--fonts);
		background-color: transparent;
	}
	button.image:hover {
		font-weight: 700;
	}
	button.image.error {
		border: 3px solid var(--danger-l2);
		color: var(--danger-l2);
	}
	button.image.error:hover {
		transform: translateY(-3px);
		box-shadow: 0px 3px 0px var(--danger-l2);
	}
	button.image.error:active {
		transform: translateY(0px);
		box-shadow: none;
		border-color: var(--danger-l1);
		color: var(--danger-l1);
	}
	button.image.loading {
		color: var(--mid-tone);
		border: 3px solid var(--mid-tone);
	}
	button.image.loading:hover {
		transform: translateY(-3px);
		box-shadow: 0px 3px 0px var(--mid-tone);
	}
	button.image.loading:active {
		transform: translateY(0px);
		box-shadow: none;
	}
</style>
