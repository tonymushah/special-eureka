<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import ChapterElement1 from "../../base/element1/ChapterElement1.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { Readable } from "svelte/store";

	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	type Chapter = {
		chapterId: string;
		title: string | undefined;
		lang: Language;
		groups: Group[];
		uploader: Uploader;
		upload_date: Date;
		haveBeenRead: boolean;
		download_state: Readable<ChapterDownloadState>;
		comments: number;
	};
	export let title: string;
	export let mangaId: string;
	export let chapters: Chapter[];
	let isCollapsed = true;
	let canCollaspe = false;
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

<div class="layout">
	<div class="body">
		<div
			class="top-body manga-content"
			role="button"
			tabindex="0"
			on:click={(e) => {
				dispatch("mangaClick", {
					...e,
					id: mangaId
				});
			}}
			on:keypress={(e) => {
				dispatch("mangaKeyPress", {
					...e,
					id: mangaId
				});
			}}
		>
			<div class="title"><p>{title}</p></div>
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
</div>

<style lang="scss">
	hr {
		margin: 0px;
		background-color: var(--mid-tone);
	}
	div.layout {
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
		font-size: 23px;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		font-weight: 800;
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
</style>
