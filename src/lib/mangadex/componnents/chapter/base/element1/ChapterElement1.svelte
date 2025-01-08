<script lang="ts" module>
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
		comments: MouseEnvDiv & {
			id: string;
		};
		commentsKeyPress: KeyboardEnvDiv & {
			id: string;
		};
	};
	export function createChapterEl1EventDispatcher() {
		return createEventDispatcher<ChapterEl1Events>();
	}
</script>

<script lang="ts">
	import { route } from "$lib/ROUTES";
	import MangaDexFlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import TrashIcon from "@mangadex/componnents/manga/page/top-info/buttons/download/TrashIcon.svelte";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { createEventDispatcher } from "svelte";
	import { EyeIcon, EyeOffIcon, MessageSquareIcon, UsersIcon } from "svelte-feather-icons";
	import type { Readable } from "svelte/store";
	import DownloadStateComp from "./DownloadStateComp.svelte";
	import Layout from "./Layout.svelte";
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
		id: string;
		title?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
		haveBeenRead?: boolean;
		download_state: Readable<ChapterDownloadState>;
		comments?: number | undefined;
	}

	let {
		id,
		title = undefined,
		lang = $bindable(),
		groups = [],
		uploader,
		upload_date,
		haveBeenRead = true,
		download_state,
		comments = undefined
	}: Props = $props();

	const dispatch = createChapterEl1EventDispatcher();

	let downloaded = $derived($download_state == ChapterDownloadState.Downloaded);
	let downloading = $derived($download_state == ChapterDownloadState.Downloading);
	let failed = $derived($download_state == ChapterDownloadState.Failed);
</script>

<article
	class="border"
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
>
	<Layout {haveBeenRead}>
		{#snippet state()}
			
				<div
					class="buttons"
					role="button"
					onclick={(e) => {
					if ($download_state != ChapterDownloadState.Downloading) {
						dispatch("download", {
							...e,
							id
						});
					}
				}}
					onkeypress={(e) => {
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
						onclick={(e) => {
						if ($download_state != ChapterDownloadState.Downloading) {
							dispatch("remove", {
								...e,
								id
							});
						}
					}}
						onkeypress={(e) => {
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
			
			{/snippet}
		<!-- @migration-task: migrate this slot by hand, `flag-reading-state` is an invalid identifier -->
	<svelte:fragment slot="flag-reading-state">
			<div>
				<MangaDexFlagIcon bind:lang />
			</div>
			<div
				class="buttons"
				role="button"
				onclick={(e) => {
					dispatch("read", {
						...e,
						id
					});
				}}
				tabindex={1}
				onkeypress={(e) => {
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
		</svelte:fragment>
		<!-- @migration-task: migrate this slot by hand, `title-groups` is an invalid identifier -->
	<svelte:fragment slot="title-groups">
			<div class="title-outer">
				<Link
					variant="base"
					href={route("/mangadex/chapter/[id]", {
						id
					})}
					ext_href={`https://mangadex.org/chapter/${id}`}
				>
					<h4 class="title">{title}</h4>
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
		</svelte:fragment>
		<!-- @migration-task: migrate this slot by hand, `date-uploader` is an invalid identifier -->
	<svelte:fragment slot="date-uploader">
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
		</svelte:fragment>
		<!-- @migration-task: migrate this slot by hand, `reading-number-comments` is an invalid identifier -->
	<svelte:fragment slot="reading-number-comments">
			<div>N/A</div>
			<div
				class="comments buttons"
				role="button"
				onclick={(e) => {
					dispatch("comments", {
						...e,
						id
					});
				}}
				onkeypress={(e) => {
					dispatch("commentsKeyPress", {
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
		</svelte:fragment>
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
</style>
