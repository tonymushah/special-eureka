<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { onMount } from "svelte";
	import type { Chapter } from "..";
	import ChapterElement1 from "../../base/element1/ChapterElement1.svelte";

	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	interface Events {
		ondownload?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		ondownloadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onread?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onreadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onmangaClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onmangaKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onremoveClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onremoveKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		oncomments?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		oncommentsKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
	}

	interface Props extends Events {
		title: string;
		mangaId: string;
		mangaLang?: Language | undefined;
		chapters: Chapter[];
	}

	let {
		title,
		mangaId,
		mangaLang = undefined,
		chapters,
		ondownload,
		ondownloadKeyPress,
		onmangaClick,
		onmangaKeyPress,
		onread,
		onreadKeyPress,
		onremoveClick: onremove,
		onremoveKeyPress,
		oncomments,
		oncommentsKeyPress
	}: Props = $props();
</script>

<article class="layout manga-element" data-manga-id={mangaId}>
	<div class="body">
		<div
			class="top-body manga-content"
			role="button"
			tabindex="0"
			onclick={(e) => {
				onmangaClick?.({
					...e,
					id: mangaId
				});
			}}
			onkeypress={(e) => {
				onmangaKeyPress?.({
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
			<div class="chapters">
				{#each chapters as { chapterId, title, lang, groups, uploader, upload_date, haveBeenRead, comments }}
					<ChapterElement1
						{ondownload}
						{onread}
						{onreadKeyPress}
						{ondownloadKeyPress}
						{onremove}
						{onremoveKeyPress}
						{oncomments}
						{oncommentsKeyPress}
						id={chapterId}
						{title}
						{lang}
						{groups}
						{upload_date}
						{uploader}
						{haveBeenRead}
						{comments}
					/>
				{/each}
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	hr {
		margin: 0px;
		background-color: var(--mid-tone);
	}
	article.layout {
		color: var(--text-color);
		background-color: var(--accent-l1);
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: 0.25rem;
		transition: height 300ms ease-in-out;
	}
	div.title > p {
		margin: 0px;
		font-size: 18px;
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
	div.manga-content:hover {
		cursor: pointer;
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
	}
</style>
