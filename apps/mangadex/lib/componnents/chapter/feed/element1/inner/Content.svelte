<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { createEventDispatcher } from "svelte";
	import ChapterElement2 from "../../../base/element2/ChapterElement2.svelte";
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
	interface Props {
		mangaId: string;
		chapterId: string;
		mangaTitle: string;
		chapterTitle?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
	}

	let {
		mangaId,
		chapterId,
		mangaTitle,
		chapterTitle = undefined,
		lang,
		groups = [],
		uploader,
		upload_date
	}: Props = $props();
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
		onkeypress={(e) => {
			dispatch("mangaKeyClick", {
				...e,
				id: mangaId
			});
		}}
		class="manga-title"
		onclick={(e) => {
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
