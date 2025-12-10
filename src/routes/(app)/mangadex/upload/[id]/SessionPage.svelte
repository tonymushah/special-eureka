<script lang="ts">
	import { sessionObjStore } from "@mangadex/stores/upload/sessions";
	import PageError from "@mangadex/componnents/PageError.svelte";
	import { titleOnlyQuery } from "@mangadex/stores/title/title-only-query";
	import { client } from "@mangadex/gql/urql";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { onlyGroupNames } from "@mangadex/stores/scanlation-groups/only-name";
	import { sendInternalSessionInQueueMutation } from "@mangadex/gql-docs/upload/session/mutations/send-in-queue";
	import { onMount } from "svelte";
	import LoadingPage from "@mangadex/componnents/pages/LoadingPage.svelte";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
	import { route } from "$lib/ROUTES";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import mangaElementContextMenu from "@mangadex/utils/context-menu/manga";
	import Images from "./Images.svelte";

	interface Props {
		sessionId: string;
	}
	let { sessionId }: Props = $props();
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

	onMount(() =>
		sessionS.subscribe((d) => {
			console.debug(d);
		})
	);
</script>

{#if session != null && session != undefined}
	<div class="layout">
		<h3>
			Upload to <Tooltip>
				{#snippet triggerContent()}
					<a
						href={route("/mangadex/title/[id]", {
							id: session.mangaId
						})}
						class="title-link"
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
							<span class="mangaId">
								{session.mangaId}
							</span>
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
		</h3>
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
		<!-- TODO implement this commit-data thingy -->
		<div class="commit-data"></div>
		<hr />
		<Images images={session.imagesUrl} {sessionId} imagesPaths={session.images} />
	</div>
{:else if session == undefined}
	<LoadingPage />
{:else}
	<PageError message={`The session ${sessionId} is not there`} />
{/if}

<style lang="scss">
	.title-link {
		text-decoration: none;
		color: inherit;
	}
	.title-link:hover {
		color: var(--primary);
	}
	.title-link:active {
		text-decoration: underline;
	}
	span.mangaId {
		text-decoration: underline;
	}
	.layout {
		margin: 0px 12px;
	}
	hr {
		color: var(--mid-tone);
	}
</style>
