<script lang="ts" module>
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	export interface ChapterEl1Events {
		onclick?: (e?: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => any;
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
		onremove?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onremoveKeyPress?: (
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
	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	export interface Props extends ChapterEl1Events {
		id: string;
		title?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
		haveBeenRead?: boolean;
		comments?: number | undefined;
	}
</script>

<script lang="ts">
	import { route } from "$lib/ROUTES";
	import MangaDexFlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import TrashIcon from "@mangadex/componnents/manga/page/top-info/buttons/download/TrashIcon.svelte";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import { ChapterDownload } from "@mangadex/download/chapter";
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { debounce } from "lodash";
	import { EyeIcon, EyeOffIcon, MessageSquareIcon, UsersIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import DownloadStateComp from "./DownloadStateComp.svelte";
	import Layout from "./Layout.svelte";

	let {
		id,
		title = undefined,
		lang = $bindable(),
		groups = [],
		uploader,
		upload_date,
		haveBeenRead = true,
		comments = undefined,
		oncomments,
		oncommentsKeyPress,
		ondownload,
		ondownloadKeyPress,
		onread,
		onreadKeyPress,
		onremove,
		onremoveKeyPress,
		onclick
	}: Props = $props();

	// TODO implement quality
	const chapter_download_inner = new ChapterDownload(id);
	const [downloading, downloaded, failed] = [
		chapter_download_inner.is_downloading(),
		chapter_download_inner.is_downloaded(),
		chapter_download_inner.has_failed()
	];
	const handle_download_event = debounce(async () => {
		if ($downloading) {
			await chapter_download_inner.cancel();
		} else {
			await chapter_download_inner.download();
		}
	});
	const showTrashButton = derived(
		[failed, downloaded, downloading],
		([$failed, $downloaded, $downloading]) => {
			return ($failed || $downloaded) && !$downloading;
		}
	);
</script>

<article
	class="border chapter-element"
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
	data-chapter-id={id}
>
	<Layout {haveBeenRead} {id}>
		{#snippet state()}
			<div
				class="buttons"
				role="button"
				onclick={async (e) => {
					ondownload?.({ ...e, id });
					await handle_download_event();
				}}
				onkeypress={async (e) => {
					ondownloadKeyPress?.({
						...e,
						id
					});
					if (e.key == "Enter") {
						await handle_download_event();
					}
				}}
				tabindex={0}
			>
				<DownloadStateComp {id} />
			</div>
			{#if $showTrashButton}
				<div
					class="buttons remove"
					onclick={async (e) => {
						onremove?.({
							...e,
							id
						});
						await chapter_download_inner.remove();
					}}
					onkeypress={async (e) => {
						onremoveKeyPress?.({ ...e, id });
						if (e.key == "Enter") {
							await chapter_download_inner.remove();
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
		{/snippet}
		{#snippet flagReadingState()}
			<div>
				<MangaDexFlagIcon bind:lang />
			</div>
			<div
				class="buttons"
				role="button"
				onclick={(e) => {
					onread?.({
						...e,
						id
					});
				}}
				tabindex={1}
				onkeypress={(e) => {
					onreadKeyPress?.({
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
		{/snippet}
		{#snippet titleGroups()}
			<div class="title-outer">
				<Link
					variant="base"
					href={route("/mangadex/chapter/[id]", {
						id
					})}
					{onclick}
					ext_href={`https://mangadex.org/chapter/${id}`}
				>
					<h4 class="title" class:empty={title == undefined}>
						{#if title}
							{title}
						{:else}
							Oneshot
						{/if}
					</h4>
				</Link>
			</div>

			<div class="groups">
				<UsersIcon />
				{#if groups.length != 0}
					{#each groups as { id, name }}
						<Link
							variant="base"
							href={route("/mangadex/group/[id]", {
								id
							})}
							ext_href={`https://mangadex.org/group/${id}`}
						>
							<span>
								{name}
							</span>
						</Link>
					{/each}
				{:else}
					<i>No Groups</i>
				{/if}
			</div>
		{/snippet}
		{#snippet dateUploader()}
			<p class="upload-date">
				<TimeAgo date={upload_date} />
			</p>
			<UserRolesComp roles={uploader.roles}>
				<a
					href={route("/mangadex/user/[id]", {
						id: uploader.id
					})}
					class="uploader"
				>
					{uploader.name}
				</a>
			</UserRolesComp>
		{/snippet}
		{#snippet readingNumberComments()}
			<div>N/A</div>
			<div
				class="comments buttons"
				role="button"
				onclick={(e) => {
					oncomments?.({
						...e,
						id
					});
				}}
				onkeypress={(e) => {
					oncommentsKeyPress?.({
						...e,
						id
					});
				}}
				tabindex={0}
			>
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
		{/snippet}
	</Layout>
</article>

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
		display: flex;
		border-radius: 0.5rem;
		border: 1px solid var(--accent-l3);
	}
	.title {
		margin: 0px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
	}
	.title.empty {
		font-style: italic;
	}
	.title-outer {
		display: contents;
	}
	.groups {
		display: flex;
		gap: 5px;
		flex-direction: row;
	}
	.groups > span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.groups > i {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.comments {
		display: flex;
		align-items: center;
		justify-items: center;
		gap: 1px;
	}
	.comments > p {
		margin: 0px 5px;
	}
	.comments > div {
		display: flex;
		align-content: center;
		justify-content: center;
	}
	a {
		color: inherit;
		text-decoration: none;
		transition: color 300ms ease-in-out;
	}
	a:hover {
		color: var(--primary);
	}
	.upload-date {
		margin: 0px;
	}
	.remove {
		color: var(--status-red);
	}
	.comments:hover {
		color: var(--primary);
	}
	.chapter-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
	}
</style>
