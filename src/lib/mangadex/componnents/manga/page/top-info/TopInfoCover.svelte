<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getTopCoverAltContextStore, getTopMangaIdContextStore } from "./context";
	import mediumZoom, { type Zoom } from "medium-zoom";
	import { onDestroy } from "svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
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

{#if coverImage}
	<div class="show-dialog">
		<img {alt} src={coverImage} bind:this={coverImageInstance} />
	</div>
{:else}
	<Skeleton height="100%" width="100%" />
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
