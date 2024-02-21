<script lang="ts">
	import type { Language } from "@mangadex/gql/graphql";
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
	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		name: string;
	};
	export let title: string | undefined = undefined;
	export let lang: Language;
	export let groups: Group[] = [];
	export let uploader: Uploader;
	export let upload_date: Date;
	export let haveBeenRead: boolean = true;
	export let download_state: ChapterDownloadState;
	export let comments: number;
</script>

<div class="border">
	<div class="layout" class:haveBeenRead>
		<div class="state">
			{#if download_state == ChapterDownloadState.Downloaded}
				<CheckIcon />
			{:else if download_state == ChapterDownloadState.Downloading}
				<DownloadCloudIcon />
			{:else if download_state == ChapterDownloadState.Failed}
				<XIcon />
			{:else}
				<DownloadIcon />
			{/if}
		</div>
		<div class="flag-reading-state">
			<div>
				<MangaDexFlagIcon bind:lang />
			</div>
			<div>
				{#if !haveBeenRead}
					<EyeIcon />
				{:else}
					<EyeOffIcon />
				{/if}
			</div>
		</div>
		<div class="title-groups">
			<h4>{title}</h4>
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
				<time datetime={upload_date.toDateString()} />
			</p>
			<a href="/" class="uploader">
				{uploader.name}
			</a>
		</div>
		<div class="reading-number-comments">
			<div>N/A</div>
			<div class="comments">
				<div>
					<MessageSquareIcon />
				</div>
				<p>{comments}</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.border {
		border-radius: 0.5rem;
		border: 1px solid var(--accent-l3);
	}
	.layout {
		display: flex;
		flex-direction: row;
		align-self: start;
		gap: 10px;
		color: var(--text-color);
		padding: 5px;
		transition: background-color 300ms ease-in-out;
		border-radius: 0.5rem;
	}
	.layout:not(.haveBeenRead) {
		border-color: var(--indication-blue);
		border-style: solid;
		border-width: 0px 0px 0px 5px;
	}
	.layout > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title-groups > h4 {
		margin: 0px;
	}
	.title-groups {
		flex-grow: 2;
	}
	.groups {
		display: flex;
		gap: 5px;
	}
	.reading-number-comments {
		align-items: center;
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
	.uploader {
		color: var(--text-color);
		text-decoration: none;
	}
</style>
