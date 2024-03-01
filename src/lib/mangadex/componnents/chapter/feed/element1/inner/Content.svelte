<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { createEventDispatcher } from "svelte";
	import ChapterElement2 from "../../../base/element2/ChapterElement2.svelte";
	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	export let mangaId: string;
	export let chapterId: string;
	export let mangaTitle: string;
	export let chapterTitle: string | undefined = undefined;
	export let lang: Language;
	export let groups: Group[] = [];
	export let uploader: Uploader;
	export let upload_date: Date;
	export let download_state: ChapterDownloadState;
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
		mangaClick: MouseEnvDiv & {
			id: string;
		};
		mangaKeyClick: KeyboardEnvDiv & {
			id: string;
		};
	}>();
</script>

<div class="content">
	<div
		tabindex="0"
		role="button"
		on:keypress={(e) => {
			dispatch("mangaKeyClick", {
				...e,
				id: mangaId
			});
		}}
		class="manga-title"
		on:click={(e) => {
			dispatch("mangaClick", {
				...e,
				id: mangaId
			});
		}}
	>
		<h4>{mangaTitle}</h4>
	</div>
	<div class="chapter">
		<ChapterElement2
			{lang}
			{download_state}
			{upload_date}
			id={chapterId}
			on:download
			on:downloadKeyPress
			{chapterTitle}
			{groups}
			{uploader}
		/>
	</div>
</div>

<style lang="scss">
	.chapter {
		width: 100%;
	}
	div.manga-title {
		font-weight: 800;
		font-size: 16px;
	}
	div.manga-title > h4 {
		display: -webkit-box;
		margin: 2px;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
		color: var(--text-color);
		transition: color 300ms ease-in-out;
	}
	.manga-title:hover > h4 {
		color: var(--primary);
	}
	.manga-title:hover {
		cursor: pointer;
	}
	div.content {
		padding-left: 12px;
		flex-grow: 3;
		text-overflow: ellipsis;
		text-align: start;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}
</style>
