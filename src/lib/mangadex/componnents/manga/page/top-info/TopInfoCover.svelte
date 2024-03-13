<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getTopCoverAltContextStore, getTopCoverContextStore } from "./context";

	const coverImageStore = getTopCoverContextStore();
	$: coverImage = $coverImageStore;
	const alt = getTopCoverAltContextStore();
</script>

{#if coverImage}
	<img {alt} src={coverImage} />
{:else}
	<Skeleton height="100%" width="100%" />
{/if}

<style lang="scss">
	img {
		border-radius: 0.5em;
		width: 100%;
	}
</style>
