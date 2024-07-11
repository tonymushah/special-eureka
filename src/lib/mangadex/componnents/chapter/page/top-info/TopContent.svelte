<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import { BookIcon, PaperclipIcon } from "svelte-feather-icons";
	import { getCurrentChapterData } from "../contexts/currentChapter";

	const current = getCurrentChapterData();
</script>

<section class="title">
	<PaperclipIcon />
	{#if $current.title != undefined && $current.chapterNumber != undefined}
		Chapter {$current.chapterNumber} - {$current.title}
	{:else if $current.chapterNumber != undefined}
		Chapter {$current.chapterNumber}
	{:else if $current.isOneshot}
		Oneshot
	{:else}
		??
	{/if}
</section>
<section class="title">
	<BookIcon />
	<div class="series">
		{#if $current.series != undefined}
			<Link
				href={route("/mangadex/title/[id]", {
					id: $current.series.id
				})}
				ext_href={`https://mangadex.org${route("/mangadex/title/[id]", {
					id: $current.series.id
				})}`}
			>
				{$current.series.title}
			</Link>
		{/if}
	</div>
</section>

<style lang="scss">
	section.title {
		display: flex;
		gap: 5px;
		font-weight: 800;
	}
</style>
