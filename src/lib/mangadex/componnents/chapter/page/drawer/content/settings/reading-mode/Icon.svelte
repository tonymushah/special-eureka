<script lang="ts">
	import { getCurrentChapterReadingModeWritable } from "@mangadex/componnents/chapter/page/contexts/currentChapterReadingMode";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import {
		BookOpenIcon,
		FileIcon,
		MehIcon,
		MoreHorizontalIcon,
		MoreVerticalIcon
	} from "svelte-feather-icons";

	const size = "18";
	const mode = getCurrentChapterReadingModeWritable();
</script>

<div>
	{#if $mode == ReadingMode.DoublePage}
		<BookOpenIcon {size} />
	{:else if $mode == ReadingMode.SinglePage}
		<FileIcon {size} />
	{:else if $mode == ReadingMode.LongStrip}
		<MoreVerticalIcon {size} />
	{:else if $mode == ReadingMode.WideStrip}
		<MoreHorizontalIcon {size} />
	{:else}
		<MehIcon {size} />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
