<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import { BookOpenIcon, FileIcon } from "svelte-feather-icons";
	import { getCurrentChapterData } from "../../contexts/currentChapter";

	const current = getCurrentChapterData();
</script>

<section>
	<div class="title">
		<div class="icon">
			<BookOpenIcon size="24" />
		</div>

		<div class="series">
			{#if $current.series != undefined}
				<Link
					href={route("/mangadex/title/[id]", {
						id: $current.series.id
					})}
					ext_href={`https://mangadex.org/title/${$current.series.id}`}
				>
					{$current.series.title}
				</Link>
			{/if}
		</div>
	</div>
	<div class="title">
		<div class="icon">
			<FileIcon size="24" />
		</div>

		{#if $current.title != undefined && $current.chapterNumber != undefined}
			Chapter {$current.chapterNumber} - {$current.title}
		{:else if $current.chapterNumber != undefined}
			Chapter {$current.chapterNumber}
		{:else if $current.isOneshot}
			Oneshot
		{:else}
			??
		{/if}
	</div>
</section>

<style lang="scss">
	div.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	section {
		display: grid;
		gap: 10px;
		font-size: 16px;
		font-weight: 600;
		.title {
			display: flex;
			gap: 5px;
			align-items: center;
			.series {
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				color: var(--primary);
			}
		}
	}
</style>
