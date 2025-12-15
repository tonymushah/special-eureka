<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { titleOnlyQuery } from "@mangadex/stores/title/title-only-query";
	import { sessionObjStore } from "@mangadex/stores/upload/sessions";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { slide } from "svelte/transition";
	import Tooltip from "../Tooltip.svelte";
	import { route } from "$lib/ROUTES";
	import { onlyGroupNames } from "@mangadex/stores/scanlation-groups/only-name";
	import FlagIcon from "../FlagIcon.svelte";
	import TimeAgo from "../TimeAgo.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import { goto } from "$app/navigation";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
	import { sendInternalSessionInQueueMutation } from "@mangadex/gql-docs/upload/session/mutations/send-in-queue";
	import { toStore } from "svelte/store";
	import { addErrorToast } from "../theme/toast/Toaster.svelte";
	import { removeInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/remove";
	import { addFileToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/add-file";
	import { addFilesToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/add-files";
	import type { MouseEventHandler } from "svelte/elements";

	interface Props {
		sessionId: string;
		onmouseenter?: MouseEventHandler<HTMLElement>;
		onmouseleave?: MouseEventHandler<HTMLElement>;
		highlighted?: boolean;
	}
	let { sessionId, onmouseenter, onmouseleave, highlighted }: Props = $props();
	const sessionS = sessionObjStore(sessionId);
	let session = $derived($sessionS);
	let titleQuery = titleOnlyQuery({
		mangaId: () => session?.mangaId ?? "",
		enabled: () => !!session,
		client
	});
	let toShowTitle = $derived.by(() => {
		const titleData = titleQuery.data;
		if (titleData != undefined) {
			return get_value_from_title_and_random_if_undefined(titleData, "en");
		}
	});
	let groupNamesQuery = onlyGroupNames({
		groupsId: () => session?.groups ?? [],
		client,
		enabled: () => !!session
	});
	let groupNames = $derived(
		new Map(groupNamesQuery.data?.map((d) => [d.id as string, d.attributes.name]) ?? [])
	);
	let sendInQueueMutation = sendInternalSessionInQueueMutation();
	let removeMutation = removeInternalSessionMutation();
	let addFileMutation = addFileToInternalSessionMutation();
	let addFilesMutation = addFilesToInternalSessionMutation();
</script>

<a
	href={route("/mangadex/upload/[id]", { id: sessionId })}
	class="top-a"
	class:highlighted
	oncontextmenu={registerContextMenuEvent({
		includeContext: false,
		addSeparator: false,
		preventDefault: true,
		stopPropagation: true,
		additionalMenus: () => [
			ContextMenuItemProvider.menuItem({
				text: "Open session",
				action: () => {
					goto(
						route("/mangadex/upload/[id]", {
							id: sessionId
						})
					);
				}
			}),
			ContextMenuItemProvider.menuItem({
				text: "Open session in a new window",
				action: () => {
					openNewWindow(
						currentLocationWithNewPath(
							route("/mangadex/upload/[id]", {
								id: sessionId
							})
						)
					);
				}
			}),
			ContextMenuItemProvider.seperator(),
			ContextMenuItemProvider.menuItem({
				text: "Send in queue",
				action: () => {
					sendInQueueMutation.mutate(sessionId, {
						onError(error) {
							addErrorToast("Cannot send session in queue", error);
						}
					});
				},
				enabled: toStore(() => !sendInQueueMutation.isPending)
			}),
			ContextMenuItemProvider.menuItem({
				text: "Remove",
				action: () => {
					removeMutation.mutate(sessionId, {
						onError(error) {
							addErrorToast("Cannot remove session", error);
						}
					});
				},
				enabled: toStore(() => !removeMutation.isPending)
			}),
			ContextMenuItemProvider.menuItem({
				text: "Add file",
				action: () => {
					addFileMutation.mutate(
						{
							sessionId
						},
						{
							onError(error) {
								addErrorToast("Cannot add file", error);
							}
						}
					);
				},
				enabled: toStore(() => !addFileMutation.isPending)
			}),
			ContextMenuItemProvider.menuItem({
				text: "Add files",
				action: () => {
					addFilesMutation.mutate(
						{
							sessionId
						},
						{
							onError(error) {
								addErrorToast("Cannot add files", error);
							}
						}
					);
				},
				enabled: toStore(() => !addFilesMutation.isPending)
			})
		]
	})}
	{onmouseenter}
	{onmouseleave}
>
	{#if session}
		<article
			transition:slide={{
				axis: "y"
			}}
		>
			<p class="title">
				Upload to:
				<Tooltip>
					{#snippet triggerContent()}
						<a
							class="title-link"
							href={route("/mangadex/title/[id]", {
								id: session.mangaId
							})}
							oncontextmenu={registerContextMenuEvent({
								includeContext: false,
								addSeparator: false,
								preventDefault: true,
								stopPropagation: true,
								additionalMenus: () =>
									mangaElementContextMenu({
										id: session.mangaId
									})
							})}
						>
							{#if toShowTitle}
								{toShowTitle}
							{:else}
								<span class="mangaId">{session.mangaId}</span>
							{/if}
						</a>
					{/snippet}
					{#snippet tooltipContent()}
						{#if toShowTitle}
							ID: {session.mangaId}
						{:else}
							Cannot load the title info for the moment
						{/if}
					{/snippet}
				</Tooltip>
			</p>
			<p class="groups">
				{#if session.groups.length == 0}
					<Tooltip>
						{#snippet triggerContent()}
							with no scanlation groups
						{/snippet}
						{#snippet tooltipContent()}
							;)
						{/snippet}
					</Tooltip>
				{:else}
					with those scanlation groups: {#each session.groups as group, index (group)}
						{@const groupName = groupNames.get(group)}
						{#if index != 0}
							,
						{/if}
						<span class="group">
							<Tooltip>
								{#snippet triggerContent()}
									{#if groupName}
										{groupName}
									{:else}
										<span class="mangaId">{group}</span>
									{/if}
								{/snippet}
								{#snippet tooltipContent()}
									{#if groupName}
										ID: {group}
									{:else}
										Cannot load the group name for the moment
									{/if}
								{/snippet}
							</Tooltip>
						</span>
					{/each}
				{/if}
			</p>
			<p class="commit-data">
				{#if session.commitData}
					{@const commitData = session.commitData}
					<FlagIcon lang={commitData.translatedLanguage} />
					{#if commitData.chapter}Chap. {commitData.chapter}
					{/if}
					{#if commitData.title}
						{#if commitData.chapter}
							-
						{/if}
						{commitData.title}
					{/if}
					{#if commitData.publishAt}
						(Publish <TimeAgo date={new Date(commitData.publishAt)} asDateUTC asInline />)
					{/if}
					{#if commitData.termsAccepted == true}
						<span class="terms accepted">(Terms Accepted)</span>
					{:else if commitData.termsAccepted == false}
						<span class="terms denied"> (Terms Denied) </span>
					{:else if commitData.termsAccepted == undefined}
						<span class="terms"> (Terms no yet choosen) </span>
					{/if}
				{:else}
					<i class="no-commit-data">No commit data</i>
				{/if}
			</p>
			<div class="images">
				{#each session.imagesUrl as image, index (image)}
					<img src={image} alt={session.images.at(index) ?? image} />
				{:else}
					<i class="no-images">No images to upload</i>
				{/each}
			</div>
		</article>
	{/if}
</a>

<style lang="scss">
	.top-a {
		text-decoration: none;
		color: inherit;
	}
	.top-a.highlighted {
		article {
			border-color: var(--indication-blue);
			background-color: var(--accent-l5);
		}
	}
	.top-a:focus {
		article {
			border-color: var(--primary-l1);
		}
	}
	span.mangaId {
		text-decoration: underline;
	}
	article {
		background-color: var(--accent-l3);
		padding: 4px 1em;
		border-radius: 3px;
		border: 3px solid var(--mid-tone);
		display: grid;
		p {
			margin: 0px;
		}
	}
	article:hover {
		background-color: var(--accent-l3-hover);
		border: 3px solid var(--primary-l2);
	}
	article:active {
		background-color: var(--accent-l3-active);
	}
	.title-link {
		text-decoration: none;
		color: inherit;
	}
	.title-link:hover {
		color: var(--primary);
	}
	.title:active {
		text-decoration: underline;
	}
	.no-commit-data {
		color: var(--status-yellow);
	}
	.terms {
		color: var(--status-yellow);
	}
	.terms.accepted {
		color: var(--status-green);
	}
	.terms.denied {
		color: var(--status-red);
	}
	.no-images {
		color: var(--status-red);
	}
	.images {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: hidden;
		gap: 8px;
		img {
			height: 24px;
		}
	}
</style>
