import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import { readManga } from "@mangadex/componnents/manga/read/ReadDialog.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import {
	cancelMutation,
	downloadMutationQuery,
	isMangaDownloaded,
	isMangaDownloading,
	removeMutation
} from "@mangadex/download/manga";
import isFollowingTitle from "@mangadex/gql-docs/title/id/follow";
import { ReadingStatus } from "@mangadex/gql/graphql";
import { set_manga_rating } from "@mangadex/stores/manga/manga_rating";
import { set_manga_reading_status } from "@mangadex/stores/manga/manga_reading_status";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import {
	ContextMenuItemProvider,
	type ContextMenuItem
} from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { openUrl } from "@tauri-apps/plugin-opener";
import { range } from "lodash";
import { get } from "svelte/store";
import { isLogged } from "../auth";
import get_value_and_random_if_undefined from "../lang/get_value_and_random_if_undefined";

type MangaElementContextMenuOption = {
	id: string;
	coverArtId?: string;
	tags?: {
		id: string;
		name: Map<string, string>;
	}[];
	authors?: {
		id: string;
		name: string;
	}[];
	artists?: {
		id: string;
		name: string;
	}[];
};

export default function mangaElementContextMenu({
	id,
	coverArtId,
	tags,
	artists,
	authors
}: MangaElementContextMenuOption): ContextMenuItem[] {
	const items = [
		ContextMenuItemProvider.menuItem({
			text: "Open title",
			action() {
				goto(route("/mangadex/title/[id]", { id }));
			},
			enabled: location.pathname != route("/mangadex/title/[id]", { id })
		}),
		ContextMenuItemProvider.menuItem({
			text: "Open title in a new window",
			action() {
				openNewWindow(
					currentLocationWithNewPath(
						route("/mangadex/title/[id]", {
							id
						})
					)
				);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Open in the browser",
			action() {
				openUrl(`https://mangadex.org/title/${id}`);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Read",
			action() {
				readManga(id);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: "Copy title id",
			action() {
				writeText(id);
			}
		}),
		ContextMenuItemProvider.seperator()
	];
	const isDownloading = get(isMangaDownloading({ id, deferred: true }));
	const isDownloaded = get(isMangaDownloaded({ id, deferred: true }));
	const isFollowed = isFollowingTitle(id);
	const set_manga_reading_status_success_toast = () => {
		addToast({
			data: {
				title: "Updated title reading status",
				description: id,
				variant: "blue"
			}
		});
	};
	const set_manga_rating_success_toast = () => {
		addToast({
			data: {
				title: "Updated title rating",
				description: id,
				variant: "blue"
			}
		});
	};
	const set_manga_reading_status_error_toast = (e: unknown) => {
		addErrorToast("Error on updating title reading status", e);
	};
	const set_manga_rating_error_toast = (e: unknown) => {
		addErrorToast("Error on updating title rating", e);
	};
	items.push(
		ContextMenuItemProvider.menuItem({
			text: get(isFollowed) ? "Unfollow title" : "Follow title",
			action() {
				isFollowed.update((v) => !v);
			},
			enabled: get(isLogged)
		}),
		ContextMenuItemProvider.subMenu({
			text: "Reading status",
			items: [
				ContextMenuItemProvider.menuItem({
					text: "None",
					action() {
						set_manga_reading_status(id, null)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Reading",
					action() {
						set_manga_reading_status(id, ReadingStatus.Reading)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "On Hold",
					action() {
						set_manga_reading_status(id, ReadingStatus.OnHold)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Plan to Read",
					action() {
						set_manga_reading_status(id, ReadingStatus.PlanToRead)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Completed",
					action() {
						set_manga_reading_status(id, ReadingStatus.Completed)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Dropped",
					action() {
						set_manga_reading_status(id, ReadingStatus.Dropped)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Re-Reading",
					action() {
						set_manga_reading_status(id, ReadingStatus.ReReading)
							.then(set_manga_reading_status_success_toast)
							.catch(set_manga_reading_status_error_toast);
					}
				})
			],
			enabled: get(isLogged)
		}),
		ContextMenuItemProvider.subMenu({
			text: "Rating",
			items: [
				...range(1, 10)
					.toReversed()
					.map((rating) =>
						ContextMenuItemProvider.menuItem({
							text: `${rating}`,
							action() {
								set_manga_rating(id, rating)
									.then(set_manga_rating_success_toast)
									.catch(set_manga_rating_error_toast);
							}
						})
					),
				ContextMenuItemProvider.menuItem({
					text: `None`,
					action() {
						set_manga_rating(id, null)
							.then(set_manga_rating_success_toast)
							.catch(set_manga_rating_error_toast);
					}
				})
			],
			enabled: get(isLogged)
		}),
		ContextMenuItemProvider.seperator()
	);

	if (isDownloading) {
		items.push(
			ContextMenuItemProvider.menuItem({
				text: "Cancel title download",
				action() {
					cancelMutation.mutateAsync(id);
				}
			})
		);
	} else {
		items.push(
			ContextMenuItemProvider.menuItem({
				text: isDownloaded ? "Re-download" : "Download",
				action() {
					downloadMutationQuery.mutateAsync(id, {
						onError(error, variables, context) {
							addErrorToast("Cannot download title", error);
						},
						onSuccess(data, variables, context) {
							addToast({
								data: {
									title: "Downloaded titile",
									description: id
								}
							});
						}
					});
				},
				enabled: get(isMounted)
			})
		);
		if (isDownloaded) {
			items.push(
				ContextMenuItemProvider.menuItem({
					text: "Remove title locally",
					action() {
						(removeMutation).mutateAsync(id);
					}
				})
			);
		}
	}
	items.push(ContextMenuItemProvider.seperator());
	if (coverArtId) {
		items.push(
			ContextMenuItemProvider.menuItem({
				text: "Save title cover image",
				action() { },
				enabled: false
			})
		);
		items.push(ContextMenuItemProvider.seperator());
	}
	if (tags) {
		items.push(
			ContextMenuItemProvider.subMenu({
				text: "Title tags",
				items: tags.map((tag) =>
					ContextMenuItemProvider.subMenu({
						text: get_value_and_random_if_undefined(tag.name, "en") ?? tag.id,
						items: [
							ContextMenuItemProvider.menuItem({
								text: "Open info",
								action() {
									goto(
										route("/mangadex/tag/[id]", {
											id: tag.id
										})
									);
								}
							}),
							ContextMenuItemProvider.menuItem({
								text: "Open info in a new window",
								action() {
									openNewWindow(
										currentLocationWithNewPath(
											route("/mangadex/tag/[id]", {
												id: tag.id
											})
										)
									);
								}
							}),
							ContextMenuItemProvider.menuItem({
								text: "Open info in the browser",
								action() {
									openUrl(`https://mangadex.org/tag/${tag.id}`);
								}
							})
						]
					})
				)
			}),
			ContextMenuItemProvider.seperator()
		);
	}
	if (artists || authors) {
		if ((authors?.length ?? 0) != 0 && authors != undefined) {
			items.push(
				ContextMenuItemProvider.subMenu({
					text: "Authors",
					items: authors.map((author) =>
						ContextMenuItemProvider.subMenu({
							text: author.name,
							items: [
								ContextMenuItemProvider.menuItem({
									text: "Open info",
									action() {
										goto(
											route("/mangadex/author/[id]", {
												id: author.id
											})
										);
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open info in a new window",
									action() {
										openNewWindow(
											currentLocationWithNewPath(
												route("/mangadex/author/[id]", {
													id: author.id
												})
											)
										);
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open info in the browser",
									action() {
										openUrl(`https://mangadex.org/author/${author.id}`);
									}
								})
							]
						})
					)
				})
			);
		}
		if ((artists?.length ?? 0) != 0 && artists != undefined) {
			items.push(
				ContextMenuItemProvider.subMenu({
					text: "Artists",
					items: artists.map((author) =>
						ContextMenuItemProvider.subMenu({
							text: author.name,
							items: [
								ContextMenuItemProvider.menuItem({
									text: "Open info",
									action() {
										goto(
											route("/mangadex/author/[id]", {
												id: author.id
											})
										);
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open info in a new window",
									action() {
										openNewWindow(
											currentLocationWithNewPath(
												route("/mangadex/author/[id]", {
													id: author.id
												})
											)
										);
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open info in the browser",
									action() {
										openUrl(`https://mangadex.org/author/${author.id}`);
									}
								})
							]
						})
					)
				})
			);
		}
	}
	return items;
}
