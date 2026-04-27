import { goto } from "$app/navigation";
import { get_value_from_maybe_getter } from "$lib";
import { extractFromAccessor } from "$lib/index.svelte";
import { route } from "$lib/ROUTES";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import exportCustomListsToCSV from "@mangadex/gql-docs/list/export/csv";
import deleteCustomListMutation from "@mangadex/gql-docs/list/id/delete";
import isFollowingCustomList, { isChangingListFollowing } from "@mangadex/gql-docs/list/id/follow";
import updateCustomListVisibilityMutation from "@mangadex/gql-docs/list/id/update-visibilty";
import { CustomListVisibility, MangaDownloadExtras } from "@mangadex/gql/graphql";
import { downloadTitlesCustomLists } from "@mangadex/mutations/custom-list/download-titles";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import {
	ContextMenuItemProvider,
	type ContextMenuItem
} from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { save } from "@tauri-apps/plugin-dialog";
import { openUrl, revealItemInDir } from "@tauri-apps/plugin-opener";
import type { MaybeGetter } from "runed";
import { derived, get } from "svelte/store";
import { isLogged } from "../auth";

type CustomListElementContextMenuOptions = {
	id: MaybeGetter<string>;
	name?: MaybeGetter<string>;
	isMine?: MaybeGetter<boolean>;
	onVisibilityChange?: (newVis: CustomListVisibility) => unknown;
	onDelete?: () => unknown;
};

export default function customListElementContextMenu({
	id,
	name: _name,
	isMine: _isMine,
	onVisibilityChange,
	onDelete
}: CustomListElementContextMenuOptions): ContextMenuItem[] {
	const name = get_value_from_maybe_getter(_name);
	const isMine = get_value_from_maybe_getter(_isMine);
	const items = [
		ContextMenuItemProvider.menuItem({
			text: name ? `Goto ${name}` : "Open custom list",
			action() {
				goto(
					route("/mangadex/list/[id]", {
						id: get_value_from_maybe_getter(id)
					})
				);
			},
			enabled:
				location.pathname !=
				route("/mangadex/list/[id]", {
					id: get_value_from_maybe_getter(id)
				})
		}),
		ContextMenuItemProvider.menuItem({
			text: name ? `Open ${name} in a new window` : "Open custom list in a new window",
			action() {
				openNewWindow(
					currentLocationWithNewPath(
						route("/mangadex/list/[id]", {
							id: get_value_from_maybe_getter(id)
						})
					)
				);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: name ? `Open ${name} in the broswer` : "Open custom list in the broswer",
			action() {
				openUrl(`https://mangadex.org/list/${get_value_from_maybe_getter(id)}`);
			}
		}),
		ContextMenuItemProvider.seperator()
	];
	const isFollowed = isFollowingCustomList(get_value_from_maybe_getter(id));
	items.push(
		ContextMenuItemProvider.menuItem({
			text: derived(isFollowed, (isFollowed) => (isFollowed ? "Unfollow" : "Follow")),
			action() {
				isFollowed.update((value) => !value);
			},
			enabled: derived(
				[isLogged, isChangingListFollowing],
				([isLogged, changing]) => isLogged && !changing
			)
		}),
		ContextMenuItemProvider.menuItem({
			text: "Export custom list as CSV",
			async action() {
				const exportPath = await save({
					title: `Export custom list ${name ?? id} as CSV`,
					filters: [
						{
							name: "CSV",
							extensions: ["csv"]
						}
					]
				});
				if (exportPath) {
					using mut = extractFromAccessor(exportCustomListsToCSV);
					mut.value.mutateAsync(
						{
							ids: [get_value_from_maybe_getter(id)],
							exportPath,
							includePrivate: get(isLogged),
							includeReadingStatus: get(isLogged),
							includeMdScore: true,
							includeForumUrl: true,
							includeScores: get(isLogged),
							includeReadChapters: get(isLogged),
							includeReadVolumes: get(isLogged)
						},
						{
							onError(error) {
								addErrorToast("Cannot export custom list as CSV", error);
							},
							onSuccess(data) {
								revealItemInDir(data);
								addToast({
									title: `Exported list ${name ?? id} as CSV`,
									description: data,
									type: "success"
								});
							}
						}
					);
				} else {
					addErrorToast("Invalid input", undefined);
				}
			},
			enabled: () => {
				const mut = exportCustomListsToCSV();
				return !mut.isPending;
			}
		})
	);
	items.push(
		ContextMenuItemProvider.seperator(),
		ContextMenuItemProvider.subMenu({
			enabled: isMounted,
			text: "Download titles",
			items: [
				ContextMenuItemProvider.menuItem({
					text: "Download all chapters",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.AllChapters,
							filter: true
						}).catch(console.error);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Download all unread",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.Unreads,
							filter: true
						}).catch(console.error);
					},
					enabled: isLogged
				}),
				ContextMenuItemProvider.menuItem({
					text: "Download all undownloaded",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.UnDownloadeds,
							filter: true
						}).catch(console.error);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Download all undownloaded unread",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.UnReadUnDownloadeds,
							filter: true
						}).catch(console.error);
					},
					enabled: isLogged
				}),
				ContextMenuItemProvider.menuItem({
					text: "Re-download all failed chapters",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.Failed,
							filter: true
						}).catch(console.error);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Re-download all failed unread chapters",
					action() {
						downloadTitlesCustomLists({
							listIDs: [get_value_from_maybe_getter(id)],
							extras: MangaDownloadExtras.UnReadFailed,
							filter: true
						}).catch(console.error);
					}
				})
			]
		})
	);
	if (isMine) {
		items.push(
			ContextMenuItemProvider.subMenu({
				text: "Change Visibility",
				items: [
					ContextMenuItemProvider.menuItem({
						text: "Public",
						action() {
							using mut = extractFromAccessor(updateCustomListVisibilityMutation);
							mut.value.mutate(
								{ id: get_value_from_maybe_getter(id), visibility: CustomListVisibility.Public },
								{
									onSuccess() {
										addToast({
											title: "Sucefully made custom list public",
											description: name ?? get_value_from_maybe_getter(id),
											type: "success"
										});
										onVisibilityChange?.(CustomListVisibility.Public);
									},
									onError(error) {
										addErrorToast("Cannot update custom list visibity", error);
									}
								}
							);
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Private",
						action() {
							using mut = extractFromAccessor(updateCustomListVisibilityMutation);
							mut.value.mutate(
								{ id: get_value_from_maybe_getter(id), visibility: CustomListVisibility.Private },
								{
									onSuccess() {
										addToast({
											title: "Sucefully made custom list private",
											description: name ?? get_value_from_maybe_getter(id),
											type: "success"
										});
										onVisibilityChange?.(CustomListVisibility.Private);
									},
									onError(error) {
										addErrorToast("Cannot update custom list visibity", error);
									}
								}
							);
						}
					})
				],
				enabled: isLogged
			}),
			ContextMenuItemProvider.menuItem({
				text: "Delete",
				action() {
					using mut = extractFromAccessor(deleteCustomListMutation);
					mut.value.mutate(get_value_from_maybe_getter(id), {
						onError(error) {
							addErrorToast("Cannot delete custom list", error);
						},
						onSuccess() {
							addToast({
								title: "Deleted custom list",
								description: name ?? get_value_from_maybe_getter(id),
								type: "warning"
							});
							onDelete?.();
						}
					});
				}
			})
		);
	}

	return items;
}
