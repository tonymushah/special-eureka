<script lang="ts">
	import { getTopCoverAltContextStore, getTopMangaIdContextStore } from "./context";
	import mediumZoom, { type Zoom } from "medium-zoom";
	import { onDestroy } from "svelte";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import { getTopMangaOriginalLanguageContextStore } from "./context/original-language";
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
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
	const originalLanguage = getTopMangaOriginalLanguageContextStore();
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true
	}));
	const alt = getTopCoverAltContextStore();
</script>

<div class="show-dialog" class:fetching={coverImage.value == undefined}>
	{#if coverImage.value}
		<img {alt} src={coverImage.value} bind:this={coverImageInstance} />
		<div class="flag">
			<FlagIcon lang={originalLanguage} />
		</div>
	{:else}
		<div class="fetching-text">
			<FlagIcon lang={originalLanguage} />
			<Fetching />
		</div>
	{/if}
</div>

<style lang="scss">
	.show-dialog {
		transition: filter 300ms ease-in-out;
		display: flex;
		position: relative;

		img {
			border-radius: 0.5em;
			width: 100%;
			transition: filter 50ms ease-in-out;
		}
		img:hover {
			filter: brightness(75%);
		}
	}
	.flag {
		right: 0.5rem;
		bottom: 0.375rem;
		position: absolute;
		display: inline-block;
		user-select: none;
		z-index: 1;
	}
	.flag:hover {
		filter: none;
	}
	.fetching-text {
		display: flex;
		gap: 4px;
		align-items: center;
	}
</style>
