import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import isFollowingUser from "@mangadex/gql-docs/user/id/follow";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { openUrl } from "@tauri-apps/plugin-opener";
import { get } from "svelte/store";
import { isLogged } from "../auth";

type UserElementContextMenuOptions = {
	id: string,
	name?: string
};

export default function userElementContextMenu({ id, name }: UserElementContextMenuOptions): ContextMenuItem[] {
	const items = [ContextMenuItemProvider.menuItem({
		text: name ? `Goto ${name}` : "Open user",
		action() {
			goto(route("/mangadex/user/[id]", {
				id
			}))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in a new window` : "Open user in a new window",
		action() {
			openNewWindow(currentLocationWithNewPath(route("/mangadex/user/[id]", {
				id
			})))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in the broswer` : "Open user in the broswer",
		action() {
			openUrl(`https://mangadex.org/user/${id}`);
		},
	}), ContextMenuItemProvider.seperator()];
	const isFollowed = isFollowingUser(id);
	items.push(ContextMenuItemProvider.menuItem({
		text: isFollowed ? "Unfollow" : "Follow",
		action() {
			isFollowed.update((value) => !value);
		},
		enabled: get(isLogged)
	}));
	return items;
}