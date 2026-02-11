<script lang="ts">
	import { getTopCoverAltContextStore, getTopMangaIdContextStore } from "./context";
	import mediumZoom, { type Zoom } from "medium-zoom";
	import { onDestroy } from "svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	const theme = getMangaDexThemeContext();
	let coverImageInstance: HTMLImageElement | undefined = $state(undefined);
	let zoom: Zoom | undefined = $state(undefined);
	$effect(() => {
		zoom = mediumZoom(coverImageInstance, {
			background: `color-mix(in srgb, ${$theme.mainBackground} 80%, transparent)`
		});
	});
	onDestroy(() => {
		zoom?.close();
	});

	const mangaId = getTopMangaIdContextStore();
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true
	}));
	const alt = getTopCoverAltContextStore();
</script>

{#if coverImage.value}
	<div class="show-dialog">
		<img {alt} src={coverImage.value} bind:this={coverImageInstance} />
	</div>
{:else}
	<Fetching />
{/if}

<style lang="scss">
	.show-dialog {
		transition: filter 300ms ease-in-out;
		:hover {
			filter: brightness(75%);
		}
		img {
			border-radius: 0.5em;
			width: 100%;
		}
	}
</style>
