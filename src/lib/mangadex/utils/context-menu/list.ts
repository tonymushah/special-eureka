import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import isFollowingUser from "@mangadex/gql-docs/user/id/follow";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { openUrl, revealItemInDir } from "@tauri-apps/plugin-opener";
import { get } from "svelte/store";
import { isLogged } from "../auth";
import exportCustomListsToMAL from "@mangadex/gql-docs/list/export/mal";
import { save } from "@tauri-apps/plugin-dialog";
import exportCustomListsToCSV from "@mangadex/gql-docs/list/export/csv";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import isFollowingCustomList from "@mangadex/gql-docs/list/id/follow";
import { CustomListVisibility } from "@mangadex/gql/graphql";
import deleteCustomListMutation from "@mangadex/gql-docs/list/id/delete";
import updateCustomListVisibilityMutation from "@mangadex/gql-docs/list/id/update-visibilty";

type CustomListElementContextMenuOptions = {
	id: string,
	name?: string,
	isMine?: boolean,
	onVisibilityChange?: () => any
};

export default function customListElementContextMenu({ id, name, isMine, onVisibilityChange }: CustomListElementContextMenuOptions): ContextMenuItem[] {
	const items = [ContextMenuItemProvider.menuItem({
		text: name ? `Goto ${name}` : "Open custom list",
		action() {
			goto(route("/mangadex/list/[id]", {
				id
			}))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in a new window` : "Open custom list in a new window",
		action() {
			openNewWindow(currentLocationWithNewPath(route("/mangadex/list/[id]", {
				id
			})))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in the broswer` : "Open custom list in the broswer",
		action() {
			openUrl(`https://mangadex.org/list/${id}`);
		},
	}), ContextMenuItemProvider.seperator()];
	const isFollowed = isFollowingCustomList(id);
	items.push(ContextMenuItemProvider.menuItem({
		text: isFollowed ? "Unfollow" : "Follow",
		action() {
			isFollowed.update((value) => !value);
		},
		enabled: get(isLogged)
	}), ContextMenuItemProvider.menuItem({
		text: "Export custom list as CSV",
		async action() {
			const exportPath = await save({
				title: `Export custom list ${name ?? id} as CSV`,
				filters: [{
					name: "CSV",
					extensions: ["csv"]
				}]
			});
			if (exportPath) {
				get(exportCustomListsToCSV).mutateAsync({
					ids: [id],
					exportPath,
					includePrivate: get(isLogged),
					"includeReadingStatus": get(isLogged),
					includeMdScore: true,
					includeForumUrl: true,
					includeScores: get(isLogged),
					includeReadChapters: get(isLogged),
					includeReadVolumes: get(isLogged)
				}, {
					onError(error, variables, context) {
						addErrorToast("Cannot export custom list as CSV", error);
					},
					onSuccess(data, variables, context) {
						revealItemInDir(data);
						addToast({
							data: {
								title: `Exported list ${name ?? id} as CSV`,
								description: data,
								variant: "primary"
							}
						})
					},
				})
			} else {
				addErrorToast("Invalid input", undefined);
			}
		},
		enabled: !get(exportCustomListsToCSV).isPending
	}));
	if (isMine) {
		items.push(ContextMenuItemProvider.subMenu({
			text: "Change Visibility",
			items: [ContextMenuItemProvider.menuItem({
				text: "Public",
				action() {
					get(updateCustomListVisibilityMutation).mutate({ id, visibility: CustomListVisibility.Public }, {
						onSuccess() {
							addToast({
								data: {
									title: "Sucefully made custom list public",
									description: name ?? id
								}
							})
							onVisibilityChange?.()
						},
						onError(error, variables, context) {
							addErrorToast("Cannot update custom list visibity", error);
						},
					})
				},
			}), ContextMenuItemProvider.menuItem({
				text: "Private",
				action() {
					get(updateCustomListVisibilityMutation).mutate({ id, visibility: CustomListVisibility.Private }, {
						onSuccess() {
							addToast({
								data: {
									title: "Sucefully made custom list private",
									description: name ?? id
								}
							})
							onVisibilityChange?.()
						},
						onError(error, variables, context) {
							addErrorToast("Cannot update custom list visibity", error);
						},
					})
				}
			})],
			enabled: get(isLogged)
		}), ContextMenuItemProvider.menuItem({
			text: "Delete",
			action() {
				get(deleteCustomListMutation).mutate(id, {
					onError(error, variables, context) {
						addErrorToast("Cannot delete custom list", error);
					},
					onSuccess() {
						addToast({
							data: {
								title: "Deleted custom list",
								description: name ?? id,
								variant: "yellow"
							},

						})
						onVisibilityChange?.();
					}
				})
			},
		}))
	}
	return items;
}