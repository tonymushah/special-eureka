<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getTopCoverAltContextStore, getTopCoverContextStore } from "../../context";

	const coverStore = getTopCoverContextStore();
	const alt = getTopCoverAltContextStore();

	$: coverImage = $coverStore;
</script>

{#if coverImage}
	<img {alt} src={coverImage} />
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
