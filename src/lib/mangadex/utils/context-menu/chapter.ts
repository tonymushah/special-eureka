import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import { cancelDownloadMutation, downloadMutation, isChapterDownloaded, isChapterDownloading, removeMutation } from "@mangadex/download/chapter";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { openUrl } from "@tauri-apps/plugin-opener";
import { get } from "svelte/store";

type ChapterElemetContextMenuItems = {
	id: string,
	groups?: { id: string, name: string }[],
	uploader: { id: string, name: string },
	openComments?: () => any;
}

export default function chapterElementContextMenuItems({ id, groups = [], uploader, openComments }: ChapterElemetContextMenuItems): ContextMenuItem[] {
	const items = [
		ContextMenuItemProvider.menuItem({
			text: "Open chapter",
			action() {
				goto(
					route("/mangadex/chapter/[id]", {
						id
					})
				);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Open chapter in a new window",
			action() {
				openNewWindow(
					currentLocationWithNewPath(
						route("/mangadex/chapter/[id]", {
							id
						})
					)
				);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Open chapter in the browser",
			action() {
				openUrl(`https://mangadex.org/chapter/${id}`);
			}
		}),
		ContextMenuItemProvider.seperator()
	];
	const isDownloading = get(isChapterDownloading({ id, deferred: true }));
	const isDownloaded = get(isChapterDownloaded({ id, deferred: true }));
	if (isDownloading) {
		items.push(
			ContextMenuItemProvider.menuItem({
				text: "Cancel download",
				action() {
					get(cancelDownloadMutation).mutateAsync(id);
				}
			})
		);
	} else {
		items.push(
			ContextMenuItemProvider.menuItem({
				text: isDownloaded ? "Re-download" : "Download",
				action() {
					get(downloadMutation).mutateAsync({
						id
					});
				},
				enabled: get(isMounted)
			})
		);
		if (isDownloaded) {
			items.push(
				ContextMenuItemProvider.menuItem({
					text: "Remove chapter locally",
					action() {
						get(removeMutation).mutateAsync(id);
					}
				})
			);
		}
	}
	items.push(ContextMenuItemProvider.seperator());
	if (groups.length != 0) {
		items.push(
			ContextMenuItemProvider.subMenu({
				text: "Scanlation Groups",
				items: groups.map((group) =>
					ContextMenuItemProvider.subMenu({
						text: group.name,
						items: [
							ContextMenuItemProvider.menuItem({
								text: "Open",
								action() {
									goto(
										route("/mangadex/group/[id]", {
											id: group.id
										})
									);
								}
							}),
							ContextMenuItemProvider.menuItem({
								text: "Open in a new window",
								action() {
									openNewWindow(
										currentLocationWithNewPath(
											route("/mangadex/group/[id]", {
												id: group.id
											})
										)
									);
								}
							}),
							ContextMenuItemProvider.menuItem({
								text: "Open in the broswer",
								action() {
									openUrl(`https://mangadex.org/group/${group.id}`);
								}
							}),
							ContextMenuItemProvider.seperator(),
							ContextMenuItemProvider.menuItem({
								text: "Copy group id",
								action() {
									writeText(group.id);
								}
							})
						]
					})
				)
			})
		);
	}
	items.push(
		ContextMenuItemProvider.subMenu({
			text: "Uploader",
			items: [
				ContextMenuItemProvider.menuItem({
					text: `Open ${uploader.name}`,
					action() {
						goto(
							route("/mangadex/user/[id]", {
								id: uploader.id
							})
						);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: `Open ${uploader.name} in a new window`,
					action() {
						openNewWindow(
							currentLocationWithNewPath(
								route("/mangadex/user/[id]", {
									id: uploader.id
								})
							)
						);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: `Open ${uploader.name} in the broswer`,
					action() {
						openUrl(`https://mangadex.org/user/${uploader.id}`);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: `Copy user id`,
					action() {
						writeText(uploader.id);
					}
				})
			]
		})
	);
	items.push(ContextMenuItemProvider.seperator());
	if (openComments) {
		items.push(ContextMenuItemProvider.menuItem({
			text: "Open forums comments",
			action() {
				openComments()
			},
		}))
	}
	items.push(
		ContextMenuItemProvider.menuItem({
			text: "Copy chapter id",
			action() {
				writeText(id);
			}
		})
	);
	return items;
}