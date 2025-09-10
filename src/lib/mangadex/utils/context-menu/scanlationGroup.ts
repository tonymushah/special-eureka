import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import isFollowingUser from "@mangadex/gql-docs/user/id/follow";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/core/commands/contextMenu";
import openNewWindow from "@special-eureka/core/commands/openNewWindow";
import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
import { openUrl } from "@tauri-apps/plugin-opener";
import { get } from "svelte/store";
import { isLogged } from "../auth";
import isFollowingGroup from "@mangadex/gql-docs/group/id/follow";

type ScanlationGroupElementContextMenuOptions = {
	id: string,
	name?: string,
	website?: string,
	discord?: string,
	leader?: {
		id: string,
		name: string
	}
};

export default function scanlationGroupElementContextMenu({ id, name, website, discord, leader }: ScanlationGroupElementContextMenuOptions): ContextMenuItem[] {
	const items = [ContextMenuItemProvider.menuItem({
		text: name ? `Goto ${name}` : "Open scanlation group",
		action() {
			goto(route("/mangadex/group/[id]", {
				id
			}))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in a new window` : "Open scanlation group in a new window",
		action() {
			openNewWindow(currentLocationWithNewPath(route("/mangadex/group/[id]", {
				id
			})))
		},
	}), ContextMenuItemProvider.menuItem({
		text: name ? `Open ${name} in the broswer` : "Open scanlation group in the broswer",
		action() {
			openUrl(`https://mangadex.org/group/${id}`);
		},
	}), ContextMenuItemProvider.seperator()];
	const isFollowed = isFollowingGroup(id);
	items.push(ContextMenuItemProvider.menuItem({
		text: isFollowed ? "Unfollow" : "Follow",
		action() {
			isFollowed.update((value) => !value);
		},
		enabled: get(isLogged)
	}));
	if (website) {
		items.push(ContextMenuItemProvider.menuItem({
			text: `Open ${name ?? "scanlation group"} website`,
			action() {
				openUrl(website)
			},
		}))
	}
	if (discord) {
		items.push(ContextMenuItemProvider.menuItem({
			text: `Open ${name ?? "scanlation group"} discord`,
			action() {
				openUrl(discord);
			},
		}))
	}
	if (leader) {
		items.push(ContextMenuItemProvider.seperator(), ContextMenuItemProvider.subMenu({
			text: "Leader",
			items: [ContextMenuItemProvider.menuItem({
				text: `Open ${leader.name}`,
				action() {
					goto(route("/mangadex/user/[id]", {
						id: leader.id
					}));
				},
			}), ContextMenuItemProvider.menuItem({
				text: `Open ${leader.name} in a new window`,
				action() {
					openNewWindow(currentLocationWithNewPath(route(`/mangadex/user/[id]`, {
						id: leader.id
					})));
				},
			}), ContextMenuItemProvider.menuItem({
				text: `Open ${leader.name} in the broswer`,
				action() {
					openUrl(`https://mangadex.org/user/${leader.id}`);
				},
			})]
		}))
	}
	return items;
}