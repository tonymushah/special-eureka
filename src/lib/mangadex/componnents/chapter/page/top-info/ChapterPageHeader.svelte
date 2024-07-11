<script lang="ts">
	import { BookIcon, CopyIcon, MenuIcon, PaperclipIcon } from "svelte-feather-icons";
	import { getCurrentChapterData } from "../contexts/currentChapter";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import { route } from "$lib/ROUTES";
	import { createEventDispatcher } from "svelte";

	const current = getCurrentChapterData();
	const dispatch = createEventDispatcher<{
		menuClick: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
		menuPress: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
</script>

<header>
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
	<section class="buttons">
		<div>
			{#if $current.volume != undefined && $current.chapterNumber != undefined}
				Volume {$current.volume} - Chapter {$current.chapterNumber}
			{:else if $current.chapterNumber != undefined}
				Chapter {$current.chapterNumber}
			{:else if $current.isOneshot}
				Oneshot
			{:else}
				??
			{/if}
		</div>
		<div>?? / ??</div>
		<div
			class="menu-button"
			tabindex="0"
			role="button"
			on:click={(e) => {
				dispatch("menuClick", e);
			}}
			on:keydown={(e) => {
				dispatch("menuPress", e);
			}}
		>
			<MenuIcon /> Menu
		</div>
	</section>
</header>

<style lang="scss">
	header {
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-style: solid;
		border-top-width: 0px;
		border-left-width: 0px;
		border-right-width: 0px;
		border-bottom-width: 1px;
		border-color: var(--mid-tone);
		padding-bottom: 10px;
	}
	section.title {
		display: flex;
		gap: 5px;
		font-weight: 800;
	}
	section.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 10px;
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--accent-l3);
			padding: 1px;
		}
	}
	.menu-button {
		gap: 5px;
		transition: background-color 200ms ease-in-out;
	}
	.menu-button:hover {
		background-color: var(--accent-l3-hover);
	}
	.menu-button:active {
		background-color: var(--accent-l3-active);
	}
</style>
