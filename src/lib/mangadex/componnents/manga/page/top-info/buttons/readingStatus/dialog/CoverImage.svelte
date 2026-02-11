<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getTopCoverAltContextStore, getTopMangaIdContextStore } from "../../../context";
	import { get_cover_image_auto_handle_error } from "@mangadex/utils/cover-art/get_cover_art.svelte";

	const alt = getTopCoverAltContextStore();
	const mangaId = getTopMangaIdContextStore();
	let coverImage = get_cover_image_auto_handle_error(() => ({
		id: mangaId,
		asManga: true
	}));
</script>

{#if coverImage.value}
	<img {alt} src={coverImage.value} />
{:else}
	<Skeleton width={"100%"} height={"100%"} />
{/if}

<style lang="scss">
	img {
		width: 100%;
		object-fit: cover;
		border-radius: 0.25em;
	}
</style>
