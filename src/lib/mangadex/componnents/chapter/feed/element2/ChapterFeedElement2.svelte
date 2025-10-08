<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import type { Chapter } from "..";
	import ChapterElement1 from "../../base/element1/ChapterElement1.svelte";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { fade } from "svelte/transition";

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
		onremove?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onremovePress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		oncomments?: (
			ev: Partial<MouseEnvDiv> & {
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
		mangaLang = undefined,
		ondownload,
		ondownloadKeyPress,
		onmangaClick,
		onmangaKeyPress,
		onread,
		onreadKeyPress,
		oncomments,
		oncommentsKeyPress,
		onremove,
		onremovePress: onremoveKeyPress
	}: Props = $props();
	let isCollapsed = $state(false);

	let [toShow, toHide] = $derived.by(() => {
		return [chapters.slice(0, 2), chapters.splice(2)];
	});
	let canCollaspe = $derived(toHide.length > 0);
	setContextMenuContext(() => mangaElementContextMenu({ id: mangaId, coverArtId: mangaId }));
</script>

{#snippet _chapters(chaps: Chapter[])}
	{#each chaps as { chapterId, title, lang, groups, uploader, upload_date, comments }}
		<ChapterElement1
			{ondownload}
			{ondownloadKeyPress}
			{onread}
			{onreadKeyPress}
			{oncomments}
			{oncommentsKeyPress}
			{onremove}
			{onremoveKeyPress}
			id={chapterId}
			{title}
			{lang}
			{groups}
			{upload_date}
			{uploader}
			{comments}
		/>
	{/each}
{/snippet}

<article class="layout manga-element" data-manga-id={mangaId}>
	<div
		class="cover manga-content"
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
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
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
			oncontextmenu={registerContextMenuEvent({
				preventDefault: true
			})}
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
				{@render _chapters(toShow)}
				<div class="animated" class:isCollapsed>
					<div class="inner">
						{@render _chapters(toHide)}
					</div>
				</div>
			</div>
			{#if canCollaspe}
				<div class="collapse">
					<ButtonAccent
						variant="4"
						onclick={() => {
							isCollapsed = !isCollapsed;
						}}
					>
						{#if isCollapsed}
							Show less
						{:else}
							Show more {#if toHide.length > 0}
								({toHide.length})
							{/if}
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
	}

	div.cover > img {
		height: 12em;
		object-fit: cover;
		width: 8em;
		padding: 0.5em;
		border-radius: 0.55em;
	}
	div.cover {
		height: 12em;
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
		gap: 5px;
		overflow: hidden;
		margin-bottom: 5px;
	}
	.chapters {
		display: grid;

		.animated {
			display: grid;
			grid-template-rows: 0fr;
			transition: grid-template-rows 300ms ease;

			.inner {
				display: grid;
				gap: 5px;
				overflow: hidden;
			}
		}
		.animated.isCollapsed {
			grid-template-rows: 1fr;
		}
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
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
	}
</style>
