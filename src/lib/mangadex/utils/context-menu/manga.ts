import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { cancelMutation, downloadMutationQuery, isMangaDownloaded, isMangaDownloading, removeMutation } from "@mangadex/download/manga";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { openUrl } from "@tauri-apps/plugin-opener";
import { get } from "svelte/store";
import get_value_and_random_if_undefined from "../lang/get_value_and_random_if_undefined";

type MangaElementContextMenuOption = {
	id: string,
	coverArtId?: string,
	tags?: {
		id: string,
		name: Map<string, string>
	}[],
	authors?: {
		id: string,
		name: string
	}[],
	artists?: {
		id: string,
		name: string
	}[]
}

export default function mangaElementContextMenu({ id, coverArtId, tags, artists, authors, }: MangaElementContextMenuOption): ContextMenuItem[] {
	const items = [ContextMenuItemProvider.menuItem({
		text: "Open title",
		action() {
			goto(route("/mangadex/title/[id]", { id }))
		},
	}), ContextMenuItemProvider.menuItem({
		text: "Open title in a new window",
		action() {
			openNewWindow(currentLocationWithNewPath(route("/mangadex/title/[id]", {
				id
			})))
		},
	}), ContextMenuItemProvider.menuItem({
		text: "Open in the browser",
		action() {
			openUrl(`https://mangadex.org/title/${id}`);
		},
	}), ContextMenuItemProvider.seperator()];
	const isDownloading = get(isMangaDownloading({ id, deferred: true }));
	const isDownloaded = get(isMangaDownloaded({ id, deferred: true }));
	if (isDownloading) {
		items.push(ContextMenuItemProvider.menuItem({
			text: "Cancel title download",
			action() {
				get(cancelMutation).mutateAsync(id)
			},
		}))
	} else {
		items.push(ContextMenuItemProvider.menuItem({
			text: isDownloaded ? "Re-download" : "Download",
			action() {
				get(downloadMutationQuery).mutateAsync(id, {
					onError(error, variables, context) {
						addErrorToast("Cannot download title", error)
					},
					onSuccess(data, variables, context) {
						addToast({
							data: {
								title: "Downloaded titile",
								description: id
							}
						})
					},
				})
			},
			enabled: get(isMounted)
		}));
		if (isDownloaded) {
			items.push(ContextMenuItemProvider.menuItem({
				text: "Remove title locally",
				action() {
					get(removeMutation).mutateAsync(id)
				},
			}))
		}
	}
	items.push(ContextMenuItemProvider.seperator());
	if (coverArtId) {
		items.push(ContextMenuItemProvider.menuItem({
			text: "Save title cover image",
			action() {

			},
			enabled: false
		}));
		items.push(ContextMenuItemProvider.seperator())
	}
	if (tags) {
		items.push(ContextMenuItemProvider.subMenu({
			text: "Title tags",
			items: tags.map((tag) => (ContextMenuItemProvider.subMenu({
				text: get_value_and_random_if_undefined(tag.name, "en") ?? tag.id,
				items: [ContextMenuItemProvider.menuItem({
					text: "Open info",
					action() {
						goto(route("/mangadex/tag/[id]", {
							id: tag.id
						}))
					},
				}), ContextMenuItemProvider.menuItem({
					text: "Open info in a new window",
					action() {
						openNewWindow(currentLocationWithNewPath(route("/mangadex/tag/[id]", {
							id: tag.id
						})))
					},
				}), ContextMenuItemProvider.menuItem({
					text: "Open info in the browser",
					action() {
						openUrl(`https://mangadex.org/tag/${tag.id}`);
					},
				})]
			})))
		}), ContextMenuItemProvider.seperator())
	}
	if (artists || authors) {
		if ((authors?.length ?? 0) != 0 && authors != undefined) {
			items.push(ContextMenuItemProvider.subMenu({
				text: "Authors",
				items: authors.map((author) => (ContextMenuItemProvider.subMenu({
					text: author.name,
					items: [ContextMenuItemProvider.menuItem({
						text: "Open info",
						action() {
							goto(route("/mangadex/author/[id]", {
								id: author.id
							}))
						},
					}), ContextMenuItemProvider.menuItem({
						text: "Open info in a new window",
						action() {
							openNewWindow(currentLocationWithNewPath(route("/mangadex/author/[id]", {
								id
							})));
						},
					}), ContextMenuItemProvider.menuItem({
						text: "Open info in the browser",
						action() {
							openUrl(`https://mangadex.org/author/${author.id}`);
						},
					})]
				})))
			}))
		}
		if ((artists?.length ?? 0) != 0 && artists != undefined) {
			items.push(ContextMenuItemProvider.subMenu({
				text: "Artists",
				items: artists.map((author) => (ContextMenuItemProvider.subMenu({
					text: author.name,
					items: [ContextMenuItemProvider.menuItem({
						text: "Open info",
						action() {
							goto(route("/mangadex/author/[id]", {
								id: author.id
							}))
						},
					}), ContextMenuItemProvider.menuItem({
						text: "Open info in a new window",
						action() {
							openNewWindow(currentLocationWithNewPath(route("/mangadex/author/[id]", {
								id
							})));
						},
					}), ContextMenuItemProvider.menuItem({
						text: "Open info in the browser",
						action() {
							openUrl(`https://mangadex.org/author/${author.id}`);
						},
					})]
				})))
			}))
		}
	}
	return items;
}