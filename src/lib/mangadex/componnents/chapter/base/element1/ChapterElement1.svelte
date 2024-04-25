<script lang="ts" context="module">
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	export type ChapterEl1Events = {
		download: MouseEnvDiv & {
			id: string;
		};
		downloadKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		remove: MouseEnvDiv & {
			id: string;
		};
		removeKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		read: MouseEnvDiv & {
			id: string;
		};
		readKeyPress: KeyboardEnvDiv & {
			id: string;
		};
	};
	export function createChapterEl1EventDispatcher() {
		return createEventDispatcher<ChapterEl1Events>();
	}
</script>

<script lang="ts">
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import {
		DeleteIcon,
		EyeIcon,
		EyeOffIcon,
		MessageSquareIcon,
		UsersIcon
	} from "svelte-feather-icons";
	import MangaDexFlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { render as timeRender, cancel as timeCancel } from "timeago.js";
	import type { Readable } from "svelte/store";
	import DownloadStateComp from "./DownloadStateComp.svelte";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import TrashIcon from "@mangadex/componnents/manga/page/top-info/buttons/download/TrashIcon.svelte";
	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	export let id: string;
	export let title: string | undefined = undefined;
	export let lang: Language;
	export let groups: Group[] = [];
	export let uploader: Uploader;
	export let upload_date: Date;
	export let haveBeenRead: boolean = true;
	export let download_state: Readable<ChapterDownloadState>;
	export let comments: number | undefined = undefined;
	let timeago: HTMLTimeElement;

	const dispatch = createChapterEl1EventDispatcher();
	onMount(() => {
		if (timeago) timeRender(timeago);
	});
	onDestroy(() => {
		if (timeago) timeCancel(timeago);
	});
	$: downloaded = $download_state == ChapterDownloadState.Downloaded;
	$: downloading = $download_state == ChapterDownloadState.Downloading;
	$: failed = $download_state == ChapterDownloadState.Failed;
</script>

<div
	class="border"
	role="article"
	on:contextmenu={(e) => {
		e.preventDefault();
	}}
>
	<div class="layout" class:haveBeenRead>
		<div class="state">
			<div
				class="buttons"
				role="button"
				on:click={(e) => {
					if ($download_state != ChapterDownloadState.Downloading) {
						dispatch("download", {
							...e,
							id
						});
					}
				}}
				on:keypress={(e) => {
					dispatch("downloadKeyPress", {
						...e,
						id
					});
				}}
				tabindex={0}
			>
				<DownloadStateComp {download_state} />
			</div>
			{#if (failed || downloaded) && !downloading}
				<div
					class="buttons remove"
					on:click={(e) => {
						if ($download_state != ChapterDownloadState.Downloading) {
							dispatch("remove", {
								...e,
								id
							});
						}
					}}
					on:keypress={(e) => {
						if ($download_state != ChapterDownloadState.Downloading) {
							dispatch("removeKeyPress", {
								...e,
								id
							});
						}
					}}
					tabindex={0}
					role="button"
				>
					<span>
						<TrashIcon />
					</span>
				</div>
			{/if}
		</div>
		<div class="flag-reading-state">
			<div>
				<MangaDexFlagIcon bind:lang />
			</div>
			<div
				class="buttons"
				role="button"
				on:click={(e) => {
					dispatch("read", {
						...e,
						id
					});
				}}
				tabindex={1}
				on:keypress={(e) => {
					dispatch("readKeyPress", {
						...e,
						id
					});
				}}
			>
				{#if !haveBeenRead}
					<EyeIcon />
				{:else}
					<EyeOffIcon />
				{/if}
			</div>
		</div>
		<div class="title-groups">
			<a href={`/mangadex/chapter/${id}`}><h4>{title}</h4></a>
			<div class="groups">
				<UsersIcon />
				{#if groups.length != 0}
					{#each groups as { id, name }}
						<a href="/">{name}</a>
					{/each}
				{:else}
					<i>No Groups</i>
				{/if}
			</div>
		</div>
		<div class="date-uploader">
			<p>
				<time datetime={upload_date.toDateString()} bind:this={timeago} />
			</p>
			<UserRolesComp roles={uploader.roles}>
				<a href="/" class="uploader">
					{uploader.name}
				</a>
			</UserRolesComp>
		</div>
		<div class="reading-number-comments">
			<div>N/A</div>
			<div class="comments">
				<div>
					<MessageSquareIcon />
				</div>
				<p>
					{#if comments}
						{comments}
					{:else}
						N/A
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.buttons {
		transition: background-color 300ms ease-in-out;
		transition: color 300ms ease-in-out;
	}
	.buttons:hover {
		background-color: var(--accent-l1-hover);
	}
	.buttons:active {
		background-color: var(--accent-l1-active);
	}
	.border {
		border-radius: 0.5rem;
		border: 1px solid var(--accent-l3);
	}
	.layout {
		display: flex;
		flex-direction: row;
		align-self: start;
		column-gap: 20px;
		color: var(--text-color);
		padding: 5px;
		transition: background-color 300ms ease-in-out;
		border-radius: 0.5rem;
	}
	.layout:not(.haveBeenRead) {
		border-style: solid;
		border-width: 0px 0px 0px 5px;
		border-color: var(--indication-blue);
	}
	.layout > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title-groups > a > h4 {
		margin: 0px;
	}
	.title-groups {
		flex-grow: 3;
	}
	.groups {
		display: flex;
		gap: 5px;
		flex-direction: row;
	}
	.groups > a {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.groups > i {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.reading-number-comments {
		align-items: center;
		flex-grow: 0.15;
	}
	.flag-reading-state {
		align-items: center;
		gap: 5px;
	}
	.flag-reading-state > div {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.state {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.reading-number-comments > .comments {
		display: flex;
		align-items: center;
		justify-items: center;
		gap: 5px;
	}
	.reading-number-comments > .comments > p {
		margin: 0px 5px;
	}
	.reading-number-comments > .comments > div {
		width: 24px;
		height: 24px;
	}
	.layout:hover {
		background-color: var(--accent-hover);
	}
	a {
		color: inherit;
		text-decoration: none;
		transition: color 300ms ease-in-out;
	}
	a:hover {
		color: var(--primary);
	}
	.date-uploader > p {
		margin: 0px;
	}
	.date-uploader {
		flex-grow: 0.15;
	}
	.remove {
		color: var(--status-red);
	}
</style>
