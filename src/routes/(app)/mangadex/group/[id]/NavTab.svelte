<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { route } from "$lib/ROUTES";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { groupStatisticsQuery } from "@mangadex/gql-docs/group/id/stats";
	import { ForumThreadType } from "@mangadex/gql/graphql";
	import { client } from "@mangadex/gql/urql";
	import { createForumThread } from "@mangadex/stores/create-forum-thread";
	import { createQuery } from "@tanstack/svelte-query";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { derived } from "svelte/store";

	const path = derived(page, ($p) => {
		let pathname = $p.url.pathname;
		if (pathname.endsWith("/")) {
			return pathname.substring(0, pathname.length - 1);
		} else {
			return pathname;
		}
	});
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	let createThreadMutation = createForumThread();
	let groupThreadQuery = createQuery(() => ({
		queryKey: ["scanlation-group", id, "thread"],
		async queryFn() {
			const res = await client
				.query(groupStatisticsQuery, {
					id
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.statistics.group.get.comments;
			} else {
				throw new Error("No data??");
			}
		},
		networkMode: "online"
	}));
</script>

<nav>
	<button
		class:active={$path == route("/mangadex/group/[id]", { id })}
		onclick={() => {
			goto(route("/mangadex/group/[id]", { id }));
		}}
	>
		Members
	</button>
	<button
		class:active={$path == route("/mangadex/group/[id]/uploads", { id })}
		onclick={() => {
			goto(route("/mangadex/group/[id]/uploads", { id }));
		}}
	>
		Feed
	</button>
	<button
		class:active={$path == route("/mangadex/group/[id]/titles", { id })}
		onclick={() => {
			goto(route("/mangadex/group/[id]/titles", { id }));
		}}
	>
		Titles
	</button>
	<button
		onclick={() => {
			const threadUrl = groupThreadQuery.data?.threadUrl;
			if (threadUrl != undefined) {
				openUrl(threadUrl);
			} else {
				createThreadMutation.mutate(
					{
						id,
						threadType: ForumThreadType.Group
					},
					{
						onError(error) {
							addErrorToast("Cannot create forum thread", error);
						},
						onSuccess(data) {
							openUrl(data.forumUrl);
							groupThreadQuery.refetch();
						}
					}
				);
			}
		}}
		disabled={createThreadMutation.isPending || groupThreadQuery.isFetching}
	>
		Comments {#if groupThreadQuery.data?.repliesCount != undefined}
			({groupThreadQuery.data.repliesCount})
		{/if}
	</button>
</nav>

<style lang="scss">
	button {
		transition: background-color 300ms ease-in-out;
		color: var(--text-color);
		font-family: var(--fonts);
		background-color: var(--accent-l1);
		border: none;
		font-size: 16px;
		padding: 5px 10px;
	}
	button:disabled {
		background-color: var(--accent);
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	button.active {
		font-weight: 800;
		background-color: var(--accent-l3);
	}
	button.active:hover {
		background-color: var(--accent-l3-hover);
	}
	button.active:active {
		background-color: var(--accent-l3-active);
	}
	nav {
		background-color: var(--accent);
		display: flex;
		gap: 10px;
		padding: 5px 10px;
		width: fit-content;
	}
</style>
