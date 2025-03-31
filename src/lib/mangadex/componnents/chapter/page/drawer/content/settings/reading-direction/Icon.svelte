<script lang="ts">
	import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "svelte-feather-icons";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";

	const readingDirection = getCurrentChapterDirection();
</script>

<div>
	{#if $readingDirection == ReadingDirection.Ltr}
		<ArrowRightCircleIcon size="18" />
	{:else}
		<ArrowLeftCircleIcon size="18" />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
