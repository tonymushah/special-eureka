<script lang="ts">
	import Layout from "@mangadex/componnents/manga/base/base2/Layout.svelte";
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import ChapterElement1 from "../../base/element1/ChapterElement1.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { Readable, Writable } from "svelte/store";
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import type { Chapter } from "..";
	interface Props {
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		mangaId: string;
		chapters: Chapter[];
		mangaLang?: Language | undefined;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		mangaId,
		chapters,
		mangaLang = undefined
	}: Props = $props();
	let isCollapsed = $state(true);
	let canCollaspe = $state(false);
	function setDisplayedChapters() {
		if (chapters.length > 3) {
			canCollaspe = true;
		}
	}
	onMount(() => {
		setDisplayedChapters();
	});
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	const dispatch = createEventDispatcher<{
		download: MouseEnvDiv & {
			id: string;
		};
		downloadKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		read: MouseEnvDiv & {
			id: string;
		};
		readKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		mangaClick: MouseEnvDiv & {
			id: string;
		};
		mangaKeyPress: KeyboardEnvDiv & {
			id: string;
		};
	}>();
</script>

<article class="layout">
	<div
		class="cover manga-content"
		role="button"
		tabindex="0"
		onclick={(e) => {
			dispatch("mangaClick", {
				...e,
				id: mangaId
			});
		}}
		onkeypress={(e) => {
			dispatch("mangaKeyPress", {
				...e,
				id: mangaId
			});
		}}
	>
		{#if $coverImage}
			<img src={$coverImage} alt={coverImageAlt} />
		{:else}
			<Skeleton height="16em" width="10em" />
		{/if}
	</div>
	<div class="body">
		<div
			class="top-body manga-content"
			role="button"
			tabindex="0"
			onclick={(e) => {
				dispatch("mangaClick", {
					...e,
					id: mangaId
				});
			}}
			onkeypress={(e) => {
				dispatch("mangaKeyPress", {
					...e,
					id: mangaId
				});
			}}
		>
			<div class="title">
				<p>
					{#if mangaLang}
						<FlagIcon lang={mangaLang} />
					{/if}
					{title}
				</p>
			</div>
		</div>
		<hr />
		<div class="bottom-body">
			<div class="chapters" class:isCollapsed>
				{#each chapters as { chapterId, title, lang, groups, uploader, upload_date, haveBeenRead, download_state, comments }}
					<ChapterElement1
						on:download
						on:downloadKeyPress
						on:read
						on:readKeyPress
						id={chapterId}
						{title}
						{lang}
						{groups}
						{upload_date}
						{uploader}
						{haveBeenRead}
						{download_state}
						{comments}
					/>
				{/each}
			</div>
			{#if canCollaspe}
				<div class="collapse">
					<ButtonAccent
						variant="4"
						on:click={() => {
							isCollapsed = !isCollapsed;
						}}
					>
						{#if isCollapsed}
							Show more
						{:else}
							Show less
						{/if}
					</ButtonAccent>
				</div>
			{/if}
		</div>
	</div>
</article>

<style lang="scss">
	article.layout {
		color: var(--text-color);
		background-color: var(--accent-l1);
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: 0.25rem;
		transition: height 300ms ease-in-out;
	}
	div.cover > img {
		height: 15em;
		object-fit: cover;
		width: 10em;
		padding: 0.5em;
		border-radius: 0.55em;
	}
	div.cover {
		height: 16em;
	}
	div.title > p {
		margin: 0px;
		font-size: 23px;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		font-weight: 800;
		overflow: hidden;
	}
	div.top-body {
		gap: 10px;
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: start;
	}
	div.body {
		display: flex;
		flex-direction: column;
		margin: 10px;
		gap: 10px;
		width: 100%;
	}
	div.bottom-body > div.chapters {
		display: flex;
		flex-direction: column;
		gap: 5px;
		overflow: hidden;
		transition: height 300ms ease-in-out;
		margin-bottom: 5px;
	}
	div.bottom-body > div.chapters:not(.isCollapsed) {
		height: initial;
	}
	div.bottom-body > div.chapters.isCollapsed {
		height: 8.6em;
	}
	div.manga-content:hover {
		cursor: pointer;
	}
	div.collapse {
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-items: center;
	}
	hr {
		margin: 0px;
		background-color: var(--mid-tone);
		padding: 0px;
	}
</style>
