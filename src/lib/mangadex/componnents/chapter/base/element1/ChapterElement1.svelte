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
	import {
		cancelDownloadMutation,
		downloadMutation,
		hasChapterDownloadingFailed,
		isChapterDownloaded,
		isChapterDownloading,
		removeMutation
	} from "@mangadex/download/chapter";
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import chapterElementContextMenuItems from "@mangadex/utils/context-menu/chapter";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { debounce } from "lodash";
	import { EyeIcon, EyeOffIcon, MessageSquareIcon, UsersIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import DownloadStateComp from "./DownloadStateComp.svelte";
	import Layout from "./Layout.svelte";
	import { getContextReadChapterMarker } from "@mangadex/stores/read-markers/context";
	import { readMarkers } from "@mangadex/stores/read-markers/mutations";
	import { RiSearchEyeLine } from "svelte-remixicon";
	import { isLogged } from "@mangadex/utils/auth";
	import type { Action } from "svelte/action";
	import { onDestroy } from "svelte";

	let {
		id,
		title = undefined,
		lang = $bindable(),
		groups = [],
		uploader,
		upload_date,
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

	const downloading = isChapterDownloading({
		id
	});
	const failed = hasChapterDownloadingFailed({
		id
	});
	const downloaded = isChapterDownloaded({
		id
	});
	const handle_download_event = debounce(async () => {
		if ($downloading) {
			await $cancelDownloadMutation.mutateAsync(id);
		} else {
			await $downloadMutation.mutateAsync({ id });
		}
	});
	const showTrashButton = derived(
		[failed, downloaded, downloading],
		([$failed, $downloaded, $downloading]) => {
			return ($failed || $downloaded) && !$downloading;
		}
	);
	setContextMenuContext(() => {
		return chapterElementContextMenuItems({
			id,
			groups,
			uploader,
			openComments: oncomments
				? () => {
						oncomments({ id });
					}
				: undefined
		});
	}, true);
	const hasBeenRead = getContextReadChapterMarker(id);
	const handleRead = debounce(() => {
		if ($isLogged) {
			if (!$readMarkers.isPending) {
				if ($hasBeenRead) {
					$readMarkers.mutate({
						reads: [],
						unreads: [id]
					});
				} else {
					$readMarkers.mutate({
						reads: [id],
						unreads: []
					});
				}
			}
		}
	});
	let isSeleted = $state(false);
</script>

<article
	class="border"
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true
	})}
	onmouseenter={({ currentTarget: article }) => {
		isSeleted = article?.hasAttribute("data-selecto-selected") ?? false;
	}}
	onmouseleave={({ currentTarget: article }) => {
		isSeleted = article?.hasAttribute("data-selecto-selected") ?? false;
	}}
>
	<Layout haveBeenRead={$hasBeenRead} {id}>
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
					aria-disabled={$removeMutation.isPending}
					onclick={async (e) => {
						onremove?.({
							...e,
							id
						});
						await $removeMutation.mutateAsync(id);
					}}
					onkeypress={async (e) => {
						onremoveKeyPress?.({ ...e, id });
						if (e.key == "Enter") {
							await $removeMutation.mutateAsync(id);
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
				class="buttons icons"
				role="button"
				onclick={(e) => {
					if (onread) {
						onread?.({
							...e,
							id
						});
					} else {
						handleRead();
					}
				}}
				tabindex={1}
				onkeypress={(e) => {
					if (onreadKeyPress) {
						onreadKeyPress?.({
							...e,
							id
						});
					} else {
						if (e.key == "Enter") {
							handleRead();
						}
					}
				}}
				aria-disabled={$readMarkers.isPending}
			>
				{#if !$hasBeenRead && $isLogged}
					<EyeIcon />
				{:else if $readMarkers.isPending || !$isLogged}
					<RiSearchEyeLine size="25" />
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

	.icons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
