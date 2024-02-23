<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import {
		CheckIcon,
		DownloadCloudIcon,
		DownloadIcon,
		EyeIcon,
		EyeOffIcon,
		MessageSquareIcon,
		UsersIcon,
		XIcon
	} from "svelte-feather-icons";
	import MangaDexFlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { render as timeRender, cancel as timeCancel } from "timeago.js";
	import Layout from "@mangadex/componnents/manga/base/base1/Layout.svelte";
	import ChapterElement2 from "../../base/element2/ChapterElement2.svelte";
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
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
	export let coverImage: string;
	export let coverImageAlt: string;
	export let mangaTitle: string;
	export let chapterTitle: string | undefined = undefined;
	export let lang: Language;
	export let groups: Group[] = [];
	export let uploader: Uploader;
	export let upload_date: Date;
	export let haveBeenRead: boolean = true;
	export let download_state: ChapterDownloadState;
	let timeago: HTMLTimeElement;
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

<ButtonBase
	type="button"
	on:click
	isBase={false}
	noPadding
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l3-active)"}
>
	<div class="layout" class:haveBeenRead>
		<div
			tabindex="-1"
			role="button"
			on:keypress={(e) => {
				dispatch("mangaKeyClick", {
					...e,
					id: mangaId
				});
			}}
			on:click={(e) => {
				dispatch("mangaClick", {
					...e,
					id: mangaId
				});
			}}
			class="cover-image"
		>
			<img src={coverImage} alt={coverImageAlt} />
		</div>
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
	</div>
</ButtonBase>

<style lang="scss">
	.chapter {
		width: 100%;
	}
	div.layout {
		color: text;
		width: var(--layout-width);
		display: flex;
		flex-direction: row;
		padding-right: 10px;
		height: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 0.25em;
	}
	.layout:not(.haveBeenRead) {
		border-style: solid;
		border-width: 0px 0px 0px 5px;
		border-color: var(--indication-blue);
	}
	div.cover-image {
		grid-area: cover;
	}
	div.cover-image > img {
		height: 120px;
		width: 80px;
		object-fit: cover;
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
	}
	div.content {
		padding-left: 12px;
		flex-grow: 3;
		text-overflow: ellipsis;
		text-align: start;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: center;
		gap: 8px;
	}
</style>
