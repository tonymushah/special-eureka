<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import UserLink from "@mangadex/componnents/user/UserLink.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { derived as storeDerived } from "svelte/store";
	import { goto, invalidate } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import customListElementContextMenu from "@mangadex/utils/context-menu/list";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import updateCustomListVisibilityMutationLoader from "@mangadex/gql-docs/list/id/update-visibilty";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { page } from "$app/state";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children, data }: Props = $props();
	let isPrivate = $derived(data.attributes.visibility == CustomListVisibility.Private);
	let user = $derived(data.relationships.user);
	let path = $derived.by(() => {
		let pathname = page.url.pathname;
		if (pathname.endsWith("/")) {
			return pathname.substring(0, pathname.length - 1);
		} else {
			return pathname;
		}
	});
	setContextMenuContext(() =>
		customListElementContextMenu({ id: data.id, name: data.attributes.name })
	);
	let updateCustomListVisibilityMutation = updateCustomListVisibilityMutationLoader();
</script>

<div class="layout">
	<div class="top-layout">
		<h1>{data.attributes.name}</h1>
		<div class="visibility">
			<p>
				Visibility: {data.attributes.visibility == CustomListVisibility.Public
					? "Public"
					: "Private"}
			</p>
			{#if data.isMine}
				{#if isPrivate}
					<DangerButtonOnlyLabel
						label="Make Public"
						onclick={() => {
							updateCustomListVisibilityMutation.mutate(
								{
									id: data.id,
									visibility: CustomListVisibility.Public
								},
								{
									onSuccess() {
										addToast({
											data: {
												title: "Sucefully made custom list public",
												description: data.attributes.name,
												variant: "yellow"
											}
										});
										goto(
											route("/mangadex/list/[id]", {
												id: data.id
											})
										);
									},
									onError(error, variables, context) {
										addErrorToast("Cannot update visibility", error);
									}
								}
							);
						}}
						disabled={updateCustomListVisibilityMutation.isPending}
					/>
				{:else}
					<ButtonAccentOnlyLabel
						label="Make Private"
						onclick={() => {
							updateCustomListVisibilityMutation.mutate(
								{
									id: data.id,
									visibility: CustomListVisibility.Private
								},
								{
									onSuccess() {
										addToast({
											data: {
												title: "Sucefully made custom list private",
												description: data.attributes.name,
												variant: "yellow"
											}
										});
										goto(
											route("/mangadex/list/[id]", {
												id: `private:${data.id}`
											})
										);
									},
									onError(error, variables, context) {
										addErrorToast("Cannot update visibility", error);
									}
								}
							);
						}}
						disabled={updateCustomListVisibilityMutation.isPending}
					/>
				{/if}
			{/if}
		</div>
		<p>
			Created by <UserLink
				name={user.attributes.username}
				roles={user.attributes.roles}
				id={user.id}
			/>
		</p>
	</div>
	<nav class="custom-list-nav">
		<button
			class:active={path ==
				route("/mangadex/list/[id]", {
					id: isPrivate ? `private:${data.id}` : data.id
				})}
			onclick={() => {
				goto(
					route("/mangadex/list/[id]", {
						id: isPrivate ? `private:${data.id}` : data.id
					})
				);
			}}
		>
			Titles
		</button>
		<button
			class:active={path ==
				route("/mangadex/list/[id]/feed", {
					id: isPrivate ? `private:${data.id}` : data.id
				})}
			onclick={() => {
				goto(
					route("/mangadex/list/[id]/feed", {
						id: isPrivate ? `private:${data.id}` : data.id
					})
				);
			}}
		>
			Feed
		</button>
	</nav>
	<MidToneLine />
	{@render children?.()}
</div>

<style lang="scss">
	.custom-list-nav {
		background-color: var(--accent);
		display: flex;
		gap: 10px;
		padding: 5px 10px;
		width: fit-content;

		button {
			transition: background-color 300ms ease-in-out;
			color: var(--text-color);
			font-family: var(--fonts);
			background-color: var(--accent-l1);
			border: none;
			font-size: 16px;
			padding: 5px 10px;
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
	}
	.layout {
		margin: 0px 10px;
	}
	.visibility {
		display: flex;
		align-items: center;
		gap: 2px;
	}
</style>
