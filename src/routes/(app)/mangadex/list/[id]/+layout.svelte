<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import UserLink from "@mangadex/componnents/user/UserLink.svelte";
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import updateCustomListVisibilityMutationLoader from "@mangadex/gql-docs/list/id/update-visibilty";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import customListElementContextMenu from "@mangadex/utils/context-menu/list";
	import { setContextMenuContext } from "@special-eureka/core/utils/contextMenuContext";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import deleteCustomListMutation from "@mangadex/gql-docs/list/id/delete";
	import FollowButton from "./FollowButton.svelte";
	import { GitBranchIcon } from "@lucide/svelte";
	import CustomListForkDialog from "@mangadex/componnents/custom-list/fork/CustomListForkDialog.svelte";
	import layoutButtonCssMod from "./layout-buttons.module.scss";
	import DownloadTitlesButton from "./DownloadTitlesButton.svelte";
	import { isLogged } from "@mangadex/utils/auth";

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

	setContextMenuContext(
		customListElementContextMenu({
			// svelte-ignore state_referenced_locally
			id: data.id,
			// svelte-ignore state_referenced_locally
			name: data.attributes.name,
			// svelte-ignore state_referenced_locally
			isMine: data.isMine,
			onVisibilityChange(vis) {
				switch (vis) {
					case CustomListVisibility.Private:
						route("/mangadex/list/[id]", {
							id: `private:${data.id}`
						});
						break;
					case CustomListVisibility.Public:
						route("/mangadex/list/[id]", {
							id: data.id
						});
						break;
					default:
						break;
				}
			},
			onDelete() {
				route("/mangadex/list/[id]", {
					id: `${data.id}`
				});
			}
		})
	);
	let deleteCustomList = deleteCustomListMutation();
	let openForkDialog = $state(false);
</script>

<div class="selecto-ctt-provider" data-selecto-context-data-provider data-custom-list-id={data.id}>
	<UsersPageBase title={data.attributes.name}>
		{#snippet _left()}
			<div class="buttons">
				{#if data.isMine}
					{#if isPrivate}
						<DangerButton
							isBase
							onclick={() => {
								updateCustomListVisibilityMutation.mutate(
									{
										id: data.id,
										visibility: CustomListVisibility.Public
									},
									{
										onSuccess() {
											addToast({
												title: "Sucefully made custom list public",
												description: data.attributes.name,
												type: "warning"
											});
											goto(
												route("/mangadex/list/[id]", {
													id: data.id
												})
											);
										},
										onError(error) {
											addErrorToast("Cannot update visibility", error);
										}
									}
								);
							}}
							disabled={updateCustomListVisibilityMutation.isPending}
						>
							<p class={layoutButtonCssMod.innerButton}>Make Public</p></DangerButton
						>
					{:else}
						<ButtonAccent
							isBase
							onclick={() => {
								updateCustomListVisibilityMutation.mutate(
									{
										id: data.id,
										visibility: CustomListVisibility.Private
									},
									{
										onSuccess() {
											addToast({
												title: "Sucefully made custom list private",
												description: data.attributes.name,
												type: "warning"
											});
											goto(
												route("/mangadex/list/[id]", {
													id: `private:${data.id}`
												})
											);
										},
										onError(error) {
											addErrorToast("Cannot update visibility", error);
										}
									}
								);
							}}
							disabled={updateCustomListVisibilityMutation.isPending}
						>
							<p class={layoutButtonCssMod.innerButton}>Make Private</p>
						</ButtonAccent>
					{/if}
					<DangerButton
						isBase
						variant="2"
						onclick={() => {
							deleteCustomList.mutate(data.id, {
								onError(error) {
									addErrorToast("Cannot delete custom list", error);
								},
								onSuccess() {
									addToast({
										title: "Deleted custom list",
										description: data.attributes.name ?? data.id,
										type: "warning"
									});
									goto(route("/mangadex/list"));
								}
							});
						}}
						disabled={deleteCustomList.isPending}
					>
						<p class={layoutButtonCssMod.innerButton}>Delete</p>
					</DangerButton>
				{:else}
					<FollowButton id={data.id} />
				{/if}
				<ButtonAccent
					isBase
					disabled={openForkDialog || !$isLogged}
					onclick={() => {
						openForkDialog = !openForkDialog;
					}}
				>
					<p class={layoutButtonCssMod.innerButton}><GitBranchIcon /> Fork</p>
				</ButtonAccent>
				<DownloadTitlesButton listId={data.id} />
			</div>
		{/snippet}
		{#snippet topRight()}
			<div class="visibility">
				<p>
					Visibility: {data.attributes.visibility == CustomListVisibility.Public
						? "Public"
						: "Private"}
				</p>
			</div>
			<p>
				Created by <UserLink
					name={user.attributes.username}
					roles={user.attributes.roles}
					id={user.id}
				/>
			</p>
		{/snippet}
		{#snippet _right()}
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
		{/snippet}
	</UsersPageBase>
</div>

<CustomListForkDialog
	bind:open={openForkDialog}
	listToFork={data.id}
	listToForkName={data.attributes.name}
/>

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
	.visibility {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.buttons {
		display: grid;
		gap: 10px;
		margin: 10px;
	}
	.selecto-ctt-provider {
		display: contents;
	}
</style>
