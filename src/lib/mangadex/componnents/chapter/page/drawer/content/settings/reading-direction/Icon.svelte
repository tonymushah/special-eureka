<script lang="ts">
	import {
		ReadingDirection,
		readingDirection
	} from "@mangadex/componnents/chapter/page/stores/readingDirection";
	import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "svelte-feather-icons";
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
