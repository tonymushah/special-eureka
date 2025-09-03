import { goto } from "$app/navigation";
import { ContextMenuItemProvider, type ContextMenuItem } from "@special-eureka/cover/commands/contextMenu";
import { route } from "$lib/ROUTES";

export default function goto_sub_menu(): ContextMenuItem {
	return ContextMenuItemProvider.subMenu({
		text: "Go to",
		items: [
			ContextMenuItemProvider.menuItem({
				text: "Home",
				action() {
					goto(route("/mangadex"));
				}
			}),
			ContextMenuItemProvider.subMenu({
				text: "Follows",
				items: [
					ContextMenuItemProvider.menuItem({
						text: "Updates",
						action() {
							goto(route("/mangadex/titles/feed"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Online Library",
						action() { }
					}),
					ContextMenuItemProvider.menuItem({
						text: "MDList",
						action() {
							goto(route("/mangadex/list"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Followed Groups",
						action() { }
					})
				]
			}),
			ContextMenuItemProvider.subMenu({
				text: "Titles",
				items: [
					ContextMenuItemProvider.menuItem({
						text: "Latest Uploads",
						action() {
							goto(route("/mangadex/titles/latest-uploads"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Random",
						action() {
							goto(route("/mangadex/title/random"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Recently Popular",
						action() { }
					}),
					ContextMenuItemProvider.menuItem({
						text: "Recently Added",
						action() {
							goto(route("/mangadex/titles/recently-added"));
						}
					})
				]
			}),
			ContextMenuItemProvider.subMenu({
				text: "Search",
				items: [
					ContextMenuItemProvider.menuItem({
						text: "Titles",
						action() {
							goto(route("/mangadex/titles"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Authors",
						action() {
							goto(route("/mangadex/author"));
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Groups",
						action() {
							goto(route("/mangadex/group"));
						}
					})
				]
			})
		]
	});
}
