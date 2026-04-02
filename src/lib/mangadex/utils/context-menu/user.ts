import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import isFollowingUser, { isChangingUserFollowing } from "@mangadex/gql-docs/user/id/follow";
import { blockOneUser } from "@mangadex/mutations/blacklist/users/block";
import { unblockOneUser } from "@mangadex/mutations/blacklist/users/unblock";
import {
	ContextMenuItemProvider,
	type ContextMenuItem
} from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { openUrl } from "@tauri-apps/plugin-opener";
import { derived } from "svelte/store";
import { isLogged } from "../auth";

type UserElementContextMenuOptions = {
	id: string;
	name?: string;
};

export default function userElementContextMenu({
	id,
	name
}: UserElementContextMenuOptions): ContextMenuItem[] {
	const items = [
		ContextMenuItemProvider.menuItem({
			text: name ? `Goto ${name}` : "Open user",
			action() {
				goto(
					route("/mangadex/user/[id]", {
						id
					})
				);
			},
			enabled:
				location.pathname !=
				route("/mangadex/user/[id]", {
					id
				})
		}),
		ContextMenuItemProvider.menuItem({
			text: name ? `Open ${name} in a new window` : "Open user in a new window",
			action() {
				openNewWindow(
					currentLocationWithNewPath(
						route("/mangadex/user/[id]", {
							id
						})
					)
				);
			}
		}),
		ContextMenuItemProvider.menuItem({
			text: name ? `Open ${name} in the broswer` : "Open user in the broswer",
			action() {
				openUrl(`https://mangadex.org/user/${id}`);
			}
		}),
		ContextMenuItemProvider.seperator()
	];
	const isFollowed = isFollowingUser(id);
	items.push(
		ContextMenuItemProvider.menuItem({
			text: derived(
				isFollowed,
				(isFollowed) => (isFollowed ? "Unfollow" : "Follow"),
				"Follow"
			),
			action() {
				isFollowed.update((value) => !value);
			},
			enabled: derived(
				[isLogged, isChangingUserFollowing],
				([logged, changing]) => logged && !changing
			)
		}),
		ContextMenuItemProvider.seperator()
	);
	items.push();
	(ContextMenuItemProvider.menuItem({
		text: `Block`,
		action() {
			blockOneUser(id)
				.then(() => {
					addToast({
						title: `Successfully added ${name ?? id} to the blacklist`,
						type: "success"
					});
				})
				.catch((e) => {
					addErrorToast(`Cannot add user ${name ?? id} to the blacklist`, e);
				});
		}
	}),
		ContextMenuItemProvider.menuItem({
			text: `Unblock`,
			action() {
				unblockOneUser(id)
					.then(() => {
						addToast({
							title: `Successfully removed ${name ?? id} to the blacklist`,
							type: "warning"
						});
					})
					.catch((e) => {
						addErrorToast(`Cannot remove user ${name ?? id} to the blacklist`, e);
					});
			}
		}),
		ContextMenuItemProvider.seperator(),
		ContextMenuItemProvider.menuItem({
			text: `Copy user id`,
			action() {
				writeText(id);
			}
		}));
	return items;
}
